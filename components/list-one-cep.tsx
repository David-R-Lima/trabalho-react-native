import { ViaCep } from "@/services/viacep/types";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

interface Props {
  cep: ViaCep;
  visible: boolean;
  onClose: () => void;
}

export function DisplayCep({ cep, visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Detalhes do CEP</Text>
          <Text>CEP: {cep.cep}</Text>
          <Text>Logradouro: {cep.logradouro}</Text>
          <Text>Complemento: {cep.complemento}</Text>
          <Text>Bairro: {cep.bairro}</Text>
          <Text>Cidade: {cep.localidade}</Text>
          <Text>UF: {cep.uf}</Text>
          <Text>IBGE: {cep.ibge}</Text>
          <Text>GIA: {cep.gia}</Text>
          <Text>DDD: {cep.ddd}</Text>
          <Text>SIAFI: {cep.siafi}</Text>

          <View style={{ marginTop: 16 }}>
            <Button title="Fechar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
