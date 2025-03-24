export default function CreateAccount() {
  //IMPORTANTE PARA A CONEXÃO BAKCEND
  /*const getlogin = async () => {
    try {
      const { data } = await axios.get(`https://localhost:3000/users`);
    } catch (error) {
      console.log(error);
    }
  };*/

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Email
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="example@email.com"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
      <label
        htmlFor="password"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Password
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            id="password"
            name="password"
            type="text"
            placeholder="2444666668888888"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
      <label
        htmlFor="cpf"
        className="block text-sm/6 font-medium text-gray-900"
      >
        CPF
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            id="cpf"
            name="cpf"
            type="text"
            placeholder="123.456.789-00"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
}
