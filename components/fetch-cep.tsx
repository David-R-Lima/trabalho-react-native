import { blue70 } from "@/constants/Colors";
import { GetCep } from "@/services/viacep";
import { ViaCep } from "@/services/viacep/types";
import { saveCep } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface Props {
    setCep: Dispatch<SetStateAction<ViaCep | null>>
}

export function FetchCep({setCep}: Props) {
  const [text, setText] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const mut = useMutation({
    mutationFn: GetCep,
    mutationKey: ["get-cep"],
    onSuccess: async(data) => {
      setCep(data)
      saveCep(data)
      queryClient.invalidateQueries({
        queryKey: ["ceps"]
      })
      console.log(data)
    }
  })

  return (
    <View
      style={styles.mainContainer}
    >
        <View style={styles.textContainer}>
            <TextInput keyboardType="numeric" style={styles.text} onChangeText={(e) => {
                setText(e)
            }}></TextInput>
        </View>
        <View style={styles.button}>
            <Button  title="Fetch cep" onPress={() => {
                if(text) {
                mut.mutateAsync({
                    cep: text
                })
                }
            }}></Button>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    width: "50%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "100%",
    backgroundColor: blue70,
    borderRadius: 4,
    padding: 4,
  },
  text: {
  },
  button: {
  }
});
