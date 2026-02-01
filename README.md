<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# VideoBox
A ideia inicial é criar uma espécie de repositório de videos.

---

# 🧭 Guia de Git do Projeto

## 📌 Estrutura de Branches

### Branches principais:

* **`main`** → código estável (produção)
* **`dev`** → integração e testes (pré-release)

### Branches de domínio:

* `nginx`
* `backend`
* `frontend`
* `process`
* `videos-repo`
* `streaming-repo`

> Cada branch de domínio corresponde à pasta do mesmo nome no repositório.
> Ex.: branch `backend` = mexe só em `/backend`.

---

# 🔁 Fluxo de Trabalho

### 1) Desenvolvimento diário

Cada dev trabalha **sempre** na branch do seu domínio.

Exemplo:

```bash
git checkout backend
```

Faz as alterações → adiciona → commita:

```bash
git add .
git commit -m "descrição clara do que foi feito"
git push origin backend
```

### 2) Pull Request para a `dev`

Terminou algo?
Abra um PR **da sua branch de domínio → para a branch `dev`**.

A `dev` é onde tudo se junta para ser testado.

### 3) Release para a `main`

Quando a `dev` estiver estável, abrimos um PR:

```
dev → main
```

Isso vira a versão de produção.

---

# 🔄 Mantendo sua branch atualizada

Antes de começar o dia, sincronize sua branch de domínio com a `dev`:

```bash
git checkout backend
git pull origin dev
```

Se der conflito:

```bash
# resolve no editor
git add .
git commit -m "fix: resolvendo conflitos"
git push origin backend
```

---

# 🛡️ Regras Importantes

1. ❌ **Nunca comitar direto na `main`**
2. ❌ **Evitar comitar direto na `dev`** (quase sempre via PR)
3. ✔️ Trabalhe **somente** na branch do seu domínio
4. ✔️ Sempre faça PR → revisão → merge
5. ✔️ Atualize sua branch com a `dev` regularmente

---

# 🧱 Estrutura do Projeto

Cada diretório corresponde a um domínio e tem sua própria branch:

```
/nginx
/backend
/frontend
/process
/videos-repo
/streaming-repo
```

Isso mantém o escopo isolado e reduz conflitos.

---

# 🧭 Resumo (versão turbo)

```
(branch domínio)
   ↓ PR
dev
   ↓ PR (release)
main
```

E no dia a dia:

```
checkout → code → commit → push → PR
```

---
>>>>>>> f9cbaabeed85764fd9ebfec551d6eaa73aeb3d00
