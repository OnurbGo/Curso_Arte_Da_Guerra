import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/home.css";
import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Estudante",
    id: "tier-student",
    href: "/",
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
    href: "/",
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
    AOS.init({
      duration: 1000,
      startEvent: "load",
    });
    window.addEventListener("load", AOS.refresh);
    return () => window.removeEventListener("load", AOS.refresh);
  }, []);

  return (
    <div className="home-container">
      {/* Seção de introdução */}
      <div className="mx-auto max-w-6xl py-12">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-5xl font-bold text-gray-900">
            Aprenda a Arte da Guerra
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore inúmeros estilos de luta, filosofias de vida
            transformadoras, técnicas derivadas de mestres antigos e a arte da
            meditação, essencial para fortalecer a mente.
          </p>
        </div>
        <div className="space-y-12">
          {/* Treinamento */}
          <div
            className="flex items-center justify-between"
            data-aos="fade-right"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-semibold">Treinamento</h2>
              <p className="mt-4 text-lg text-gray-600">
                Descubra técnicas avançadas e treine ao lado dos melhores
                instrutores. Como disse Bruce Lee: "Eu não temo o homem que
                praticou 10.000 chutes uma vez, mas o homem que praticou um
                chute 10.000 vezes."
              </p>
            </div>
            <div className="w-1/2">
              <img
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/my-app/src/assets/Treinamento.webp"
                alt="Treinamento"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Estilos de Luta */}
          <div
            className="flex items-center justify-between"
            data-aos="fade-left"
          >
            <div className="w-1/2">
              <img
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/my-app/src/assets/Paisagem.webp"
                alt="Estilos de Lutas"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2 pl-8">
              <h2 className="text-3xl font-semibold">Estilos de Lutas</h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore filosofias de combate que aprimoram suas habilidades e
                transformam sua vida.
              </p>
            </div>
          </div>

          {/* Meditação */}
          <div
            className="flex items-center justify-between"
            data-aos="fade-right"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-semibold">Meditação</h2>
              <p className="mt-4 text-lg text-gray-600">
                Fortaleça sua mente através da meditação. Uma mente serena
                permite enxergar com clareza.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/my-app/src/assets/Meditação.webp"
                alt="Meditação"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Planos */}
      <div className="mx-auto max-w-4xl text-center mt-16" data-aos="fade-up">
        <h2 className="text-base font-semibold text-gray-600">Planos</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Escolha o plano ideal para você
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 sm:text-xl">
        Selecione um plano para ensinar ou aprender artes marciais online.
      </p>
      <div
        className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2"
        data-aos="fade-up"
      >
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? "relative bg-gray-900 shadow-2xl" : "bg-white/60",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 transition-transform duration-300 hover:scale-105"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-red-400" : "text-red-600",
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
                    className={classNames(
                      tier.featured ? "text-red-400" : "text-red-600",
                      "h-6 w-5 flex-none"
                    )}
                    aria-hidden="true"
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
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "text-red-600 ring-1 ring-red-200 hover:ring-red-300",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
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
