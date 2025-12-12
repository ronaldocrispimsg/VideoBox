export default function Login() {
  return (
    <div className="flex align-middle items-center">

        <div className=" grid rounded-3xl border border-zinc-200 h-72 w-96 gap-5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Acesse sua conta</h3>
            <form className="mt-4 flex flex-col gap-3">
                <input
                type="email"
                placeholder="E-mail"
                className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                type="password"
                placeholder="Senha"
                className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:outline-none"
                />
                <button
                type="submit"
                className="mt-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                Entrar
                </button>
            </form>
        </div>
    </div>
  )
}
