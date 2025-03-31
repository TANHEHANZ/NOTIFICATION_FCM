// contexts/ModalContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../shared/components/styles/global";

interface ModalContextType {
  showModal: (content: ReactNode, title?: string) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const showModal = (content: ReactNode, title: string = "") => {
    setModalContent(content);
    setModalTitle(title);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
    setModalTitle("");
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isVisible && (
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            {/* Header del modal */}
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={hideModal}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Contenido personalizado */}
            <View style={modalStyles.modalContent}>{modalContent}</View>
          </View>
        </View>
      )}
    </ModalContext.Provider>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "85%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  modalContent: {
    padding: 16,
  },
});
