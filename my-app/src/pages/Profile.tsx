import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ImageUploadModal from "../components/ImageUploadModal";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import {
  User,
  UserUpdatePayload,
  Teacher,
  TeacherUpdatePayload,
  DecodedTokenFull,
} from "../Interfaces/interfaces";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">(
    "success"
  );

  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [biography, setBiography] = useState("");
  const [expertise, setExpertise] = useState("");
  const [teacherMessage, setTeacherMessage] = useState("");
  const [teacherMessageType, setTeacherMessageType] = useState<
    "error" | "success"
  >("success");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) return navigate("/login");
    let decoded: DecodedTokenFull;
    try {
      decoded = jwt_decode<DecodedTokenFull>(token);
    } catch {
      return navigate("/login");
    }
    axios
      .get<User>(import.meta.env.VITE_API_URL+`users/${decoded.user.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data;
        setUserData(user);
        setName(user.name);
        setAvatarUrl(user.url_img || "");
        if (user.type === "teacher") {
          axios
            .get<Teacher[]>(import.meta.env.VITE_API_URL+`teachers`, {
              withCredentials: true,
            })
            .then((r) => {
              const t = r.data.find((x) => x.user_id === user.id);
              if (t) {
                setTeacherData(t);
                setBiography(t.biography);
                setExpertise(t.expertise);
              }
            });
        }
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const validatePassword = (pwd: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);
  };
  const evaluatePasswordStrength = (pwd: string): string => {
    return validatePassword(pwd) ? "Forte" : "Fraca";
  };
  const renderMessage = (text: string, type: "error" | "success") => (
    <div
      className={`mt-2 flex items-center justify-center space-x-2 rounded px-4 py-2 text-sm ${
        type === "error"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {type === "error" ? <XCircle size={16} /> : <CheckCircle size={16} />}
      <span>{text}</span>
    </div>
  );

  const handleNewAvatar = async (newUrl: string) => {
    if (!userData) return;
    setAvatarUrl(newUrl);
    try {
      const res = await axios.put<User>(
        import.meta.env.VITE_API_URL+`users/${userData.id}`,
        { name: userData.name, url_img: newUrl } as UserUpdatePayload,
        { withCredentials: true }
      );
      setUserData(res.data);
      setAvatarUrl(res.data.url_img || "");
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;
    if (password && password !== confirmPassword) {
      setMessage("As senhas não conferem.");
      setMessageType("error");
      return;
    }
    const payload: UserUpdatePayload = { name };
    if (password) payload.password = password;
    try {
      const res = await axios.put<User>(
        import.meta.env.VITE_API_URL+`users/${userData.id}`,
        payload,
        { withCredentials: true }
      );
      setMessage("Perfil atualizado com sucesso!");
      setMessageType("success");
      setUserData(res.data);
      setName(res.data.name);
      setPassword("");
      setConfirmPassword("");
      setPasswordStrength("");
    } catch {
      setMessage("Erro ao salvar perfil.");
      setMessageType("error");
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherData || !userData) return;
    if (password && password !== confirmPassword) {
      setTeacherMessage("As senhas não conferem.");
      setTeacherMessageType("error");
      return;
    }
    const payload: TeacherUpdatePayload = { name, biography, expertise };
    if (password) payload.password = password;
    try {
      await axios.put(
        import.meta.env.VITE_API_URL+`teachers/${teacherData.id}`,
        payload,
        { withCredentials: true }
      );
      setTeacherMessage("Dados do professor atualizados!");
      setTeacherMessageType("success");
      setUserData({ ...userData, name });
      setPassword("");
      setConfirmPassword("");
      setPasswordStrength("");
    } catch {
      setTeacherMessage("Erro ao salvar dados do professor.");
      setTeacherMessageType("error");
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="flex items-center p-6 bg-indigo-600 text-white">
          <div
            onClick={() => setModalOpen(true)}
            className="h-16 w-16 rounded-full bg-indigo-800 overflow-hidden cursor-pointer flex items-center justify-center"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                onError={() => setAvatarUrl("")}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">{userData.name}</h1>
            <p className="text-sm opacity-75">{userData.email}</p>
          </div>
        </header>

        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSend={handleNewAvatar}
        />

        <div className="p-6 space-y-8">
          <form onSubmit={handleUserSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    setPasswordStrength(evaluatePasswordStrength(val));
                  }}
                  placeholder="Nova senha ou deixe em branco"
                  className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <p
                  className={`mt-1 text-sm ${
                    passwordStrength === "Fraca"
                      ? "text-red-500"
                      : "text-teal-500"
                  }`}
                >
                  Senha: {passwordStrength}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme a senha"
                  className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Salvar Alterações
            </button>
            {message && renderMessage(message, messageType)}
          </form>

          {userData.type === "teacher" && teacherData && (
            <form
              onSubmit={handleTeacherSubmit}
              className="space-y-5 pt-8 border-t border-gray-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Biografia
                </label>
                <textarea
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  required
                  rows={4}
                  className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Especialização
                </label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  required
                  className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Salvar Dados do Professor
              </button>
              {teacherMessage &&
                renderMessage(teacherMessage, teacherMessageType)}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
