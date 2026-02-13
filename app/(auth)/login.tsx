import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

//COMPONENT
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";



type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const { control, handleSubmit } = useForm<FormData>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);

            await login(data.email, data.password);

            router.replace("/home");

        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: "Email wajib diisi" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <AppInput
            label="Email"
            placeholder="Masukkan email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password wajib diisi" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <AppInput
            label="Password"
            placeholder="Masukkan password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <AppButton
        title="Login"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
