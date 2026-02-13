import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export default function AppInput({ label, error, ...props }: Props) {
  return (
    <View style={{ marginBottom: 18 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput style={styles.input} {...props} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  error: {
    color: "#ef4444",
    marginTop: 4,
    fontSize: 12,
  },
});
