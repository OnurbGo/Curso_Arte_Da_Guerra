import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

interface User {
  id: number;
  name: string;
  email: string;
  CPF: string;
  type: string;
  registration_date: string;
}

interface DecodedToken {
  user: User;
}

interface Teacher {
  id: number;
  user_id: number;
  biography: string;
  expertise: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [biography, setBiography] = useState("");
  const [expertise, setExpertise] = useState("");
  const [teacherMessage, setTeacherMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwt_decode<DecodedToken>(token);
      const userId = decoded.user.id;

      axios
        .get(`http://localhost:3000/users/${userId}`, { withCredentials: true })
        .then((res) => {
          setUserData(res.data);
          setName(res.data.name);

          if (res.data.type === "teacher") {
            axios
              .get(`http://localhost:3000/teachers`, { withCredentials: true })
              .then((resTeachers) => {
                const teacher = resTeachers.data.find(
                  (t: Teacher) => t.user_id === res.data.id
                );
                if (teacher) {
                  setTeacherData(teacher);
                  setBiography(teacher.biography);
                  setExpertise(teacher.expertise);
                }
              })
              .catch((err) => {
                console.error("Erro ao buscar dados do professor:", err);
              });
          }
        })
        .catch((err) => {
          console.error("Erro ao buscar dados do usuário:", err);
        });
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) return;
    try {
      const updatedData: Partial<User> & { password?: string } = {
        name,
        email: userData.email,
        CPF: userData.CPF,
        type: userData.type,
      };

      if (password.trim() !== "") {
        updatedData.password = password;
      }
      await axios.put(
        `http://localhost:3000/users/${userData.id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      setMessage("Perfil atualizado com sucesso!");
      setUserData({ ...userData, name });
      setPassword("");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setMessage("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teacherData || !userData) return;
    try {
      const teacherUpdatedData = {
        name: userData.name,
        email: userData.email,
        CPF: userData.CPF,
        password: password,
        biography,
        expertise,
      };
      await axios.put(
        `http://localhost:3000/teachers/${teacherData.id}`,
        teacherUpdatedData,
        { withCredentials: true }
      );
      setTeacherMessage("Dados do professor atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados do professor:", error);
      setTeacherMessage(
        "Erro ao atualizar dados do professor. Tente novamente."
      );
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meu Perfil</h2>
      {message && (
        <p className="mb-6 text-center text-green-500 font-semibold">
          {message}
        </p>
      )}

      {/* Formulário para dados de conta */}
      <form onSubmit={handleUserSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite nova senha ou deixe em branco"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Salvar Alterações
          </button>
        </div>
      </form>

      {/* Se o usuário for teacher, exibe formulário para atualizar dados do professor */}
      {userData.type === "teacher" && teacherData && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Dados do Professor
          </h3>
          {teacherMessage && (
            <p className="mb-6 text-center text-green-500 font-semibold">
              {teacherMessage}
            </p>
          )}
          <form onSubmit={handleTeacherSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Biografia
              </label>
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Especialização
              </label>
              <input
                type="text"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Salvar Dados do Professor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
