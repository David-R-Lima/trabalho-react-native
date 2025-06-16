

// components/CepList.tsx
import { fetchAllCeps } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function CepList() {
  const { data, refetch } = useQuery({
    queryKey: ["ceps"],
    queryFn: fetchAllCeps
  })

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         refetch();
    //     }, 5000);

    //     return () => clearInterval(interval); // cleanup on unmount
    // }, []);

  if (data && data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No CEPs found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((cep, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cepText}>{cep.cep}</Text>
          <Text style={styles.addressText}>
            {cep.logradouro}, {cep.bairro}
          </Text>
          <Text>{cep.localidade} - {cep.uf}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cepText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
