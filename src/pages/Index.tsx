import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl mb-6 shadow-[var(--shadow-card)]">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sistema de Gerenciamento de Alunos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Plataforma completa para gestão acadêmica com segurança e eficiência
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="shadow-[var(--shadow-card)]"
          >
            Acessar Sistema
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">CRUD Completo</h3>
            <p className="text-muted-foreground text-sm">
              Crie, leia, atualize e exclua registros de alunos com facilidade
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Segurança JWT</h3>
            <p className="text-muted-foreground text-sm">
              Autenticação robusta com validação de senha forte e e-mail único
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Gestão Eficiente</h3>
            <p className="text-muted-foreground text-sm">
              Interface moderna com listagem paginada e busca otimizada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
