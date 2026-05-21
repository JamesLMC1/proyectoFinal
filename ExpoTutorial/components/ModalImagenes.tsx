import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { colors, sharedStyles } from "@/theme";

interface ModalImagenesProps {
  visible: boolean;
  imagenes: string[];
  onClose: () => void;
}

export default function ModalImagenes({ visible, imagenes, onClose }: ModalImagenesProps) {
  const total = imagenes.length;
  const [errores, setErrores] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setErrores(prev => new Set(prev).add(index));
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={sharedStyles.backdrop} onPress={onClose}>
        <View
          style={sharedStyles.modalContainer}
          onStartShouldSetResponder={() => true}
        >
          <View style={[sharedStyles.modalHeader, { backgroundColor: colors.primary }]}>
            <Text style={sharedStyles.modalTitle}>Imágenes ({total})</Text>
            <Pressable style={sharedStyles.closeButton} onPress={onClose}>
              <Text style={[sharedStyles.closeButtonText, { color: colors.primary }]}>✕</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {total === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay imágenes disponibles</Text>
              </View>
            ) : (
              <View style={styles.grid}>
                {imagenes.map((url, i) => (
                  <View key={i} style={styles.imageSlot}>
                    {errores.has(i) ? (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Error al cargar</Text>
                      </View>
                    ) : (
                      <Image
                        source={{ uri: url }}
                        style={styles.image}
                        contentFit="contain"
                        transition={300}
                        onError={() => handleImageError(i)}
                      />
                    )}
                    <Text style={styles.imageLabel}>Imagen {i + 1}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  imageSlot: {
    width: "46%",
    alignItems: "center",
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  imageLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  errorContainer: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
