import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { colors, sharedStyles } from "@/theme";

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }
    setError("");
    try {
      await login(email.trim(), password);
      router.replace("/(tabs)/inicio");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>APIANIMES</Text>
        <Text style={styles.subtitle}>Iniciar Sesión</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.com"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />

        {error !== "" && (
          <View style={sharedStyles.errorBox}>
            <Text style={sharedStyles.errorText}>{error}</Text>
          </View>
        )}

        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
        </Pressable>

        <Link href="/auth/register" style={styles.link}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </Link>

        <Text style={styles.fallback}>Prueba: admin1234@gmail.com / 1234567</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  header: {
    alignItems: "center",
    marginBottom: 56,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 3,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: 10,
    fontWeight: "500",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputLabel: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border + "30",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  link: {
    marginTop: 24,
    alignItems: "center",
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },
  fallback: {
    color: colors.textMuted + "80",
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
  },
});
