import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Estudante",
    id: "tier-student",
    href: "/courses",
    priceMonthly: "R$29",
    description:
      "O plano ideal para alunos que desejam aprender artes marciais, aprimorar técnicas e receber certificação.",
    features: [
      "Acesso às aulas básicas",
      "Certificados de conclusão",
      "Suporte da comunidade",
      "Material complementar",
    ],
    featured: false,
  },
  {
    name: "Professor",
    id: "tier-teacher",
    href: "/teacher/dashboard",
    priceMonthly: "R$99",
    description:
      "Para instrutores que querem compartilhar conhecimento, criar cursos e inspirar alunos com suas técnicas.",
    features: [
      "Criação de cursos ilimitados",
      "Monetização das aulas",
      "Suporte prioritário",
      "Ferramentas avançadas de ensino",
      "Relatórios de desempenho",
      "Acesso ao fórum de instrutores",
    ],
    featured: true,
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative isolate bg-white px-6 lg:px-8">
      {/* Seção Superior: Imagens e Descrições */}
      <div className="mx-auto max-w-6xl py-12">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-5xl font-bold text-gray-900">
            Aprenda a Arte da Guerra
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore inúmeros estilos de lutas, filosofias de vida, técnicas
            derivadas e a arte da meditação.
          </p>
        </div>
        <div className="space-y-12">
          {/* Seção 1 */}
          <div
            className="flex items-center justify-between"
            data-aos="fade-right"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-semibold">Treinamento</h2>
              <p className="mt-4 text-lg text-gray-600">
                Descubra técnicas e treine com os melhores instrutores.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/Front_End/FrontEnd/my-app/src/assets/Treinamento.webp"
                alt="Treinamento"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Seção 2 */}
          <div
            className="flex items-center justify-between"
            data-aos="fade-left"
          >
            <div className="w-1/2">
              <img
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/Front_End/FrontEnd/my-app/src/assets/Paisagem.webp"
                alt="Estilos de Lutas"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2 pl-8">
              <h2 className="text-3xl font-semibold">Estilos de Lutas</h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore as diferentes filosofias e estilos de combate que podem
                transformar sua vida.
              </p>
            </div>
          </div>

          {/* Seção 3 */}
          <div
            className="flex items-center justify-between"
            data-aos="fade-right"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-semibold">Meditação</h2>
              <p className="mt-4 text-lg text-gray-600">
                Encontre o equilíbrio através da meditação e da concentração.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/Front_End/FrontEnd/my-app/src/assets/Meditação.webp"
                alt="Meditação"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seção Inferior: Escolher Plano */}
      <div className="mx-auto max-w-4xl text-center mt-16" data-aos="fade-up">
        <h2 className="text-base font-semibold text-indigo-600">Planos</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Escolha o plano ideal para você
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 sm:text-xl">
        Selecione um plano para ensinar ou aprender artes marciais online.
      </p>
      <div
        className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-0" // Removido gap-x no desktop
        data-aos="fade-up"
      >
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-t-3xl lg:rounded-bl-3xl lg:rounded-br-3xl" // Garantido arredondamento para todas as bordas no Estudante
                : "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-br-3xl", // Garantido arredondamento para todas as bordas no Professor
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "text-base font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /mês
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? "bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                  : "text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              Escolher plano
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
