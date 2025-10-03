## Visão geral (resumida)

Lista rápida dos arquivos e pastas principais (uma linha cada):

- `src/app/page.js` → entrada da página inicial.
- `src/app/layout.js` → layout global e wrappers do app.
- `src/app/portfolio/page.jsx` → página do portfólio que exibe o carrossel/lista de projetos.
- `src/app/portfolio/[slug]/page.jsx` → ProjectDetail: mostra detalhes do projeto, galeria e QRCode.
- `src/components/Carousel3D.jsx` → carrossel 3D (lê `src/data/portfolio.json`).
- `src/components/CarouselReal.jsx` → carrossel alternativo/simplificado (lê `src/data/portfolio.json`).
- `src/components/NavigationBarSection.jsx` → barra de navegação do site.
- `src/components/*` → componentes diversos (AboutUsSection, FooterSection, etc.).
# 📌 Visão Geral (resumida)

Lista rápida dos arquivos/pastas principais (uma linha cada):

- `src/app/page.js` → página inicial
- `src/app/layout.js` → layout global
- `src/app/portfolio/page.jsx` → lista / carrossel de projetos
- `src/app/portfolio/[slug]/page.jsx` → detalhe do projeto + QRCode
- `src/components/Carousel3D.jsx` → carrossel principal (lê `src/data/portfolio.json`)
- `src/components/CarouselReal.jsx` → carrossel alternativo
- `src/data/portfolio.json` → **fonte única** dos dados
- `public/assets/<slug>/` → imagens de cada projeto (`profile.svg`, `01.svg`, `02.svg`, `03.svg`)


# 🔧 Manutenção Manual (checklist rápido)

Siga estes passos curtos quando precisar editar algo no portfólio.

1. **Imagens**

### Trocar imagens mantendo o padrão

- Onde: `public/assets/<slug>/`
- Padrão obrigatório (mantenha estes nomes):
  - `profile.svg` → capa do card / carrossel
  - `01.svg`, `02.svg`, `03.svg` → galeria do modal
- Se apenas substituir mantendo os mesmos nomes → **não é necessário** editar o JSON.

Exemplo (substituir capa):

```powershell
Copy-Item C:\meus\arquivos\nova-capa.svg public/assets/projeto01/profile.svg -Force
```

### Usar extensão diferente (ex.: .txt em vez de .svg)

- Aceitável, desde que você atualize o caminho no JSON.
- Renomeie/adicione o arquivo (ex.: `profile.txt`) e aponte `assets.profile` para `/assets/<slug>/profile.txt`.

Exemplo curto (trecho do JSON):

```json
{ "slug": "projeto01", "assets": { "profile": "/assets/projeto01/profile.txt" } }
```

2. **QRCode / link do projeto**

- O QRCode e o botão **Abrir link** usam o campo `link` em `src/data/portfolio.json`.
- Pode ser URL absoluta (`https://...`) ou caminho relativo começando com `/`.

Exemplo curto:

```json
{ "slug": "projeto01", "link": "https://exemplo.com" }
```

3. **Renomear pasta do projeto (`slug`)**

- Passos mínimos:
  1. Renomeie a pasta em `public/assets/old-slug/` → `public/assets/new-slug/`.
  2. Atualize o campo `"slug"` no `src/data/portfolio.json` para o novo valor.
  3. Verifique `assets.profile` / `assets.gallery` e atualize se necessário.

Exemplo (PowerShell):

```powershell
Rename-Item public/assets/projeto01 -NewName meu-projeto
# depois atualize "slug" no JSON
```


# 📝 Template de JSON para preencher

Copie este objeto e cole dentro do array em `src/data/portfolio.json`. Substitua os placeholders:

```json
{
  "slug": "meu-projeto",
  "name": "Título aqui",
  "subtitle": "Subtítulo aqui",
  "description": "Descrição aqui",
  "team": ["Membro 1", "Membro 2"],
  "link": "https://link-ou-site-aqui.com",
  "assets": {
    "profile": "/assets/meu-projeto/profile.svg",
    "gallery": [
      "/assets/meu-projeto/01.svg",
      "/assets/meu-projeto/02.svg",
      "/assets/meu-projeto/03.svg"
    ]
  }
}
```

> Campos rápidos (inline): `slug` = rota `/portfolio/<slug>`, `link` = usado pelo QRCode, `assets.profile` = capa do card, `assets.gallery` = imagens do modal.


# ℹ️ Observações finais

- **Fonte única da verdade:** `src/data/portfolio.json` — edite sempre lá.
- **Boas práticas:** mantenha os nomes padrão das imagens por pasta (`profile.svg`, `01.svg`, `02.svg`, `03.svg`).
- **Deploy:** alterações em `src/data/portfolio.json` ou em `public/assets` podem requerer rebuild/redeploy em produção.

---

Se quiser, eu adiciono um `src/data/README.md` com este template ao lado do JSON.
---

Se quiser, posso adicionar um `src/data/README.md` com este template ao lado do JSON.


