var fs = require('fs');
const controleBrowsers = require('./../../services/controleBrowser');

module.exports = function (app) {
    app.get('/api/consulta-cnpj', function (req, res) {
        
        const puppeteer = require('puppeteer');
    
        (async () => {
            const browser = await puppeteer.launch({
              headless: true,
              //slowMo: 250
            });
            const page = await browser.newPage();
            await page.goto('http://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Solicitacao_CS.asp');
            await page.setViewport({ width: 1366, height: 768 });
            await page.waitForSelector('#imgCaptcha');
            let eCaptcha = await page.$('#imgCaptcha');
            eCaptcha = await eCaptcha.boundingBox();
            await page.screenshot({
                path: 'screenshot.png',
                clip: {
                    x: eCaptcha.x,
                    y: eCaptcha.y,
                    width: eCaptcha.width,
                    height: eCaptcha.height
                }
            });

            let image = await fs.readFileSync('./screenshot.png', 'base64');
            
            controleBrowsers.set('puppeteer', {browserInstance: browser, pageInstance: page});

            res.send({
                json: {
                    message: 'Captcha capturado com sucesso!',
                    data: `data:image/png;base64, ${image}`
                }, status: 200
            });
        })();
    });

    app.post('/api/consulta-cnpj', async function (req, res) {

        let {browserInstance, pageInstance} = await controleBrowsers.get('puppeteer');
        
        let {captcha, cnpj} = await req.body;

        await pageInstance.evaluate((captcha, cnpj) => {
            document.querySelector('#cnpj').value = cnpj;
            document.querySelector('#txtTexto_captcha_serpro_gov_br').value = captcha;
            document.querySelector('#frmConsulta > div:nth-child(4) > div > button.btn.btn-primary').click();
        }, captcha, cnpj);

        await pageInstance.waitForSelector('#principal > table:nth-child(1) > tbody > tr > td > table:nth-child(5) > tbody > tr > td > font:nth-child(1)');
        
        const coletarDadosEmpresa = async (page) => {
            let result;
        
            try{
        
                //BUSCA POR INFORMAÇÕES DA EMPRESA NA TABELA GERADA PELA RECEITA
                const resultsSelector = '#principal table tbody tr td font';
                await page.waitForSelector(resultsSelector);
        
                const links = await page.evaluate(resultsSelector => {
                    const anchors = Array.from(document.querySelectorAll(resultsSelector));
                    return anchors.map(anchor => {
                        return anchor.textContent;
                    });
                }, resultsSelector);
        
                result = await criarJSONDadosReceita(limparArrayDados(links));
            }catch(err){
        
                console.log(`Erro no site da receita ao consultar o CNPJ "${cnpj}"`);
            }finally{
        
                return result; 
            }
        }
        
        const criarJSONDadosReceita = async (dados) => {
        
            let extrairChave = (await criarExtracaoChaveDadosReceita(dados));
        
            return {
                logradouro: extrairChave('logradouro'),
                numero: extrairChave(/^número$/i).replace(/\D+/g, ''),
                cep: extrairChave('cep'),
                bairro: extrairChave('bairro/distrito'),
                complemento: extrairChave('complemento') == '********' ? '' : extrairChave('complemento'),
                telefone: extrairChave('telefone').substr(0, 14),
                email: extrairChave('endereço eletrônico'),
                razao_social: extrairChave('nome empresarial')
            };
        }
        
        const criarExtracaoChaveDadosReceita = (dados) => {
            
            return chave => {
                let verificacaoChave = typeof chave == 'string'
                ? d => d.toLowerCase().includes(chave)
                : d => chave.test(d);
        
                let idxDesejado = (dados.findIndex(verificacaoChave)) + 1;
                return dados[idxDesejado];
            };
        }
        
        const limparArrayDados = (arr) => {
        
            return (
                arr.map(txt => txt
                    .replace(/\s+/g, ' ')
                    .replace(/^\s|\s$/g, '')
                    .replace(/\s?\/$/g, '')
                    .replace(/\n/g, '')
                    .replace(/^.*?([A-Z].*[A-Z]).*$/i, '$1')
                )
            );
        }

        res.send(await coletarDadosEmpresa(pageInstance))
    });
}