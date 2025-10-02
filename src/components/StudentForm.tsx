import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

interface Student {
  id: string;
  full_name: string;
  email: string;
  matricula: string;
}

interface StudentFormProps {
  student?: Student;
  onSuccess: () => void;
}

const studentSchema = z.object({
  full_name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  matricula: z.string().trim().min(5, "Matrícula deve ter no mínimo 5 caracteres").max(20),
});

const StudentForm = ({ student, onSuccess }: StudentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: student?.full_name || "",
    email: student?.email || "",
    matricula: student?.matricula || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = studentSchema.parse(formData);

      if (student) {
        // Update existing student
        const { error } = await supabase
          .from("students")
          .update(validatedData)
          .eq("id", student.id);

        if (error) throw error;
        toast.success("Aluno atualizado com sucesso!");
      } else {
        // Create new student
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const { error } = await supabase
          .from("students")
          .insert([{ 
            full_name: validatedData.full_name,
            email: validatedData.email,
            matricula: validatedData.matricula,
            user_id: user.id 
          }]);

        if (error) throw error;
        toast.success("Aluno cadastrado com sucesso!");
      }

      onSuccess();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error.message?.includes("duplicate key")) {
        toast.error("Este e-mail ou matrícula já está cadastrado");
      } else {
        toast.error("Erro ao salvar: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Nome Completo</Label>
        <Input
          id="full_name"
          type="text"
          placeholder="João da Silva"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail Institucional</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.email@instituicao.edu.br"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="matricula">Matrícula</Label>
        <Input
          id="matricula"
          type="text"
          placeholder="20241234567"
          value={formData.matricula}
          onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Salvando..." : student ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default StudentForm;
