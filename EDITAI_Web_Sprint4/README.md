# EDITAI com Nexa — Sprint 4

Entrega conjunta de Front-end Design e Web Development, Engenharia de Software, FIAP.

## Links de avaliação

- Repositório Git: https://github.com/NEXAFIAP2026/sprint4-react-frontend
- Deploy na Vercel: **pendente de publicação na conta da equipe**. Substituir este aviso pela URL real retornada pela Vercel antes de entregar.

O código está preparado para a Vercel, mas preparação não equivale a publicação. Consulte o passo a passo abaixo para concluir o deploy e registrar a URL.

## Evolução da Sprint 3

Esta aplicação reúne os dois projetos fornecidos pela equipe:

- `FRONTEND-SPRINT3-main`: landing page em HTML/CSS, identidade escura, detalhes em verde-água, logo Nexa, apresentação, público-alvo, galeria de protótipos e equipe.
- `sprint3webdev-main`: React com Vite, componentes Login/Header/Gallery, credenciais de demonstração, três fotos de paisagem e estilos Vibrante, Sombrio, Quente e Esverdeado.

As seções e os cinco arquivos visuais da landing page foram preservados e migrados para componentes React. O nome EDITAI identifica a solução completa e Nexa continua sendo a assistente. Os textos de público-alvo foram ajustados ao contexto fotográfico; as afirmações de IA profissional foram substituídas pela descrição do protótipo realmente implementado.

A galeria ganhou importação de fotos, controle manual, comparação, download PNG real, histórico visível e paletas externas. O `setTimeout` que simulava processamento foi removido. O histórico antigo `nexa_fotos` não é apagado, mas não é migrado automaticamente: ele guardava somente URLs e nomes de estilos, sem a imagem editada. A versão nova usa outra chave de armazenamento.

## Tecnologias utilizadas

- React 19 e React DOM: componentes, props, estado, efeitos, contexto e referências.
- React Router 7: rotas públicas e privadas, navegação e retorno após login.
- Tailwind CSS 4 com plugin oficial do Vite: layout, tipografia, cores e responsividade.
- Vite 8: desenvolvimento e build de produção.
- Canvas API: processamento local e exportação da imagem.
- Fetch API e The Color API: consulta externa real de três cores.
- LocalStorage: miniaturas e parâmetros no histórico.
- SessionStorage: sessão demonstrativa na aba.
- Node Test Runner: testes de funções e respostas da API.

## Pré-requisitos

- Node.js **22.12 ou superior**; recomendado Node 24 LTS.
- npm, instalado junto com o Node.
- Navegador atualizado, recomendado Chrome ou Edge, com suporte a Canvas 2D filters.
- Internet para instalar dependências e consultar a API. As imagens de exemplo e protótipos estão incluídas no projeto.

## Instalar e executar em outra máquina

Extraia o ZIP e abra o terminal na pasta que contém `package.json`:

```console
npm ci
npm run dev
```

Abra o endereço exibido no terminal, normalmente http://127.0.0.1:5173. Se a porta estiver ocupada, use a porta informada pelo Vite.

Para gerar e testar a versão de produção:

```console
npm run build
npm run preview
```

O build é gerado em `dist/`. O preview normalmente usa http://127.0.0.1:4173. Não abra `index.html` diretamente pelo explorador de arquivos: execute pelo servidor do Vite.

## Back-end e credenciais de teste

Não existe back-end neste protótipo. Basta executar o servidor front-end do Vite. A API de paletas é um serviço público externo, sem chave e sem instalação adicional.

- E-mail: **aluno@fiap.com.br**
- Senha: **1234**

As credenciais foram mantidas da Sprint 3. O login é demonstrativo, validado no próprio navegador. As rotas privadas exercitam proteção de navegação, mas não oferecem segurança de servidor ou autenticação real. Não use dados ou senhas pessoais. Não há cadastro, cobrança ou compartilhamento de imagens. Atualizar a aba mantém a sessão; sair remove a sessão local. Falhas de armazenamento são informadas.

## Rotas

| Rota | Acesso | Conteúdo |
|---|---|---|
| `/` | Público | Landing page migrada, solução, público-alvo, sobre, galeria e equipe |
| `/login` | Público | Formulário e credenciais de demonstração |
| `/editor` | Privado | Galeria, upload, Nexa, ajustes manuais, paleta e exportação |
| `/historico` | Privado | Busca, miniaturas, parâmetros, exclusão e exportação JSON |
| Demais caminhos | Público | Página não encontrada com retorno ao início |

Um visitante que tenta abrir uma rota privada é redirecionado ao login. Após entrar, retorna à rota solicitada. O arquivo `vercel.json` permite abrir e atualizar essas URLs diretamente no deploy sem erro 404 do servidor.

## Funcionalidades

1. Navegue pelas três paisagens da galeria original ou importe uma foto JPG, PNG ou WebP de até 12 MB e 24 megapixels.
2. Escolha um estilo ou escreva uma intenção direta, como `quero algo quente`.
3. Ajuste iluminação, contraste, saturação, tons quentes, matiz e preto e branco pelos controles.
4. Alterne entre original e resultado. Os ajustes são aplicados ao Canvas, sem alterar o arquivo original.
5. Consulte uma paleta online e toque em uma cor para aplicar uma tonalidade suave de 15%. Essa tonalidade pode ser removida.
6. Dê um nome e baixe o PNG processado. O maior lado é limitado a 2000 px para manter o protótipo leve.
7. Salve uma miniatura e os parâmetros no histórico. Abra o histórico para buscar, inspecionar, excluir registros e exportar JSON.

O histórico tem limite de 30 registros e pertence ao navegador/origem em uso. Mudar de computador, domínio ou navegador não transfere os dados. A sessão de demonstração não cria perfis separados de armazenamento. O JSON contém miniaturas e parâmetros, sem as imagens completas; para preservá-las, baixe o PNG. A exportação JSON não possui importação/restauração pela interface nesta versão. Dados inválidos são preservados e uma mensagem orienta a exportação ou exclusão deliberada.

## Componentes props e hooks

- `Header`, `Footer`, `SectionTitle`, `StyleButton`, `Slider` e `ProtectedRoute` são componentes reutilizáveis.
- `SectionTitle` recebe número, título e texto por props.
- `StyleButton` recebe perfil, estado selecionado e função de escolha.
- `Slider` recebe campo, valor, limites e função de alteração.
- `useState`: formulários, ajustes e feedback.
- `useEffect`: carregamento das fotos, atualização do Canvas, título e navegação.
- `useRef`: referência ao Canvas e cancelamento das consultas.
- `useContext`: acesso à sessão de demonstração.
- Hooks personalizados: `useEditor`, `useHistorico`, `usePaleta` e `useAuth`.
- `services/` guarda regras de interpretação, montagem de filtros e chamada HTTP, separadas das páginas e componentes visuais.

## API externa

O botão Consultar paleta online realiza um `fetch` HTTPS para The Color API:

```text
https://www.thecolorapi.com/scheme?hex=336699&mode=complement&count=3
```

`hex` é substituído pela cor média da foto original, calculada localmente. Só essa cor é enviada, não a imagem. O código verifica status HTTP, quantidade de cores, hexadecimal e nome. O hook usa timeout de oito segundos e AbortController para cancelar consultas antigas. O usuário vê estados de carregamento, erro e nova tentativa pelo mesmo botão. Não há paletas inventadas como fallback. A disponibilidade e o CORS do serviço dependem do provedor.

Documentação: https://www.thecolorapi.com/docs

## Uso de inteligência artificial no projeto

A IA foi utilizada como apoio ao desenvolvimento para analisar os dois projetos da Sprint 3, integrar a landing page ao React, auxiliar na organização dos componentes e hooks, adaptar o layout ao Tailwind, revisar o tratamento de erros e elaborar testes e documentação. O grupo deve revisar e compreender o código antes da apresentação. Na aplicação, a Nexa funciona por regras de palavras-chave, não por um modelo de IA treinado ou generativo: reconhece intenções como vibrante, sombrio, quente e esverdeado e escolhe parâmetros predefinidos. A análise da cor média serve à consulta de paletas, sem reconhecimento de objetos ou compreensão semântica da cena.

## Responsividade e acessibilidade

O layout utiliza grids e flexbox com breakpoints do Tailwind. As páginas são adaptadas para celular, tablet e desktop. O menu mobile possui estado expandido, os campos têm labels, os botões têm foco visível e os erros/status usam regiões acessíveis. Existe link para pular ao conteúdo e respeito à preferência por movimento reduzido. A comparação é controlada por botão, sem exigir gesto de arrastar.

## Testes

```console
npm test
npm run build
```

Os testes verificam estilos preservados, valores neutros, reconhecimento de palavras e acentos, filtro completo, nome de download e respostas válidas/inválidas da API. As respostas da API são simuladas somente nos testes automatizados; o aplicativo usa o endpoint real.

Verificação desta entrega: os 12 testes automatizados passaram, o build de produção foi gerado e uma chamada real ao serviço de paletas retornou três cores. A revisão visual no navegador não pôde ser concluída porque a prévia local não ficou acessível no ambiente de desenvolvimento. Portanto, o roteiro manual abaixo, incluindo as três larguras, ainda precisa ser executado. A tentativa de envio ao GitHub também foi bloqueada pelo acesso à autenticação do ambiente; não houve push confirmado nem deploy confirmado na Vercel.

Roteiro de avaliação manual:

1. Abrir `/editor` sem sessão e verificar o redirecionamento para `/login`.
2. Tentar credenciais incorretas; depois entrar com as credenciais acima.
3. Aplicar Vibrante, Sombrio, Quente e Esverdeado e comparar com o original.
4. Importar uma foto, mudar um slider e baixar o PNG; abrir o download para conferir.
5. Consultar a paleta online e aplicar/remover uma cor.
6. Salvar uma edição; abrir e atualizar o histórico; buscar pelo nome e exportar JSON.
7. Cancelar a limpeza do histórico; excluir um registro e testar o estado vazio.
8. Sair e tentar abrir `/historico` novamente.
9. Conferir larguras aproximadas de 390 px, 768 px e 1440 px.
10. No site publicado, abrir diretamente `/editor` e atualizar a página para validar o rewrite.

## Publicar com Git e Vercel

O repositório informado pela equipe é:

```text
https://github.com/NEXAFIAP2026/sprint4-react-frontend.git
```

Se o repositório estiver vazio, na raiz do projeto:

```console
git init
git add .
git commit -m "Integra landing page e assistente EDITAI na Sprint 4"
git branch -M main
git remote add origin https://github.com/NEXAFIAP2026/sprint4-react-frontend.git
git push -u origin main
```

Se já estiver em um clone desse repositório, copie os arquivos do projeto para ele, sem copiar `node_modules`, e use somente `git add`, `git commit` e `git push`. Não recrie o remote se ele já existir e não use force push.

Na Vercel:

1. Entre na conta da equipe e selecione Add New → Project.
2. Importe `NEXAFIAP2026/sprint4-react-frontend` e autorize o repositório se necessário.
3. Selecione o preset Vite, raiz `.`, build `npm run build` e saída `dist`.
4. Configure Node 24.x, sem variáveis de ambiente para este protótipo.
5. Publique, abra a URL gerada e confira landing, login e rotas diretas.
6. Substitua o aviso no começo deste README pela URL real e faça um novo commit.

Referências oficiais: https://tailwindcss.com/docs/installation/using-vite · https://reactrouter.com/start/declarative/routing · https://vercel.com/docs/frameworks/frontend/vite

## Organização

```text
public/assets/       Logo, protótipos e paisagens locais
src/components/      Partes visuais reutilizáveis
src/context/         Sessão demonstrativa
src/hooks/           Lógica do editor, histórico e paleta
src/pages/           Início, login, editor e histórico
src/services/        Regras e acesso à API
src/App.jsx          Rotas da aplicação
src/main.jsx         Entrada do React
src/styles.css       Tailwind e estilos globais
tests/               Testes automatizados
INTEGRANTES.TXT      Nomes e RMs exigidos pelo professor
vercel.json          Configuração de build e rotas no deploy
package-lock.json    Versões das dependências para npm ci
```

## Identificação e créditos

Os cinco integrantes e RMs estão em `INTEGRANTES.TXT`, mantido dentro do ZIP. A identificação segue a lista enviada pela equipe: Felipe Santos, Gabriel Pereira, João Leão, Thomaz Vitorino e Yago Hideo.

Logo e quatro telas de protótipo foram fornecidos pela equipe no projeto Front-end Sprint 3. As três paisagens são as mesmas referências Unsplash do componente Gallery da Sprint 3, agora incluídas localmente para não depender de internet no editor:

- https://images.unsplash.com/photo-1506744038136-46273834b3fb
- https://images.unsplash.com/photo-1441974231531-c6227db76b6e
- https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05

## Entrega conjunta

Entregar um único ZIP com código-fonte, `package.json`, `package-lock.json`, assets, README, configuração de deploy e **INTEGRANTES.TXT**. Não incluir `node_modules`, `.git`, fotos pessoais ou credenciais de contas. Informar o link Git e a URL real da Vercel. Apenas um aluno faz a entrega, conforme o enunciado.

Limites: sem back-end, autenticação real, RAW, nitidez por convolução, análise profissional de cena ou sincronização entre dispositivos. O resultado depende do suporte do navegador aos filtros Canvas. Não há promessa de nota; a avaliação pertence ao professor.
