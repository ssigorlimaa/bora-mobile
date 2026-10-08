import React from "react";
import { Platform, Pressable, StyleSheet, Text, View, Linking } from "react-native";
import { C } from "../constants/theme";

type Props = {
  lat?: number | null;
  lng?: number | null;
  label?: string | null;
};

export default function RunMap({ lat, lng, label }: Props) {
  const hasCoords = typeof lat === "number" && typeof lng === "number";
  const openMaps = () => {
    if (!hasCoords) return;
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
  };

  if (!hasCoords) {
    return (
      <View style={s.fallback}>
        <Text style={s.pin}>⌖</Text>
        <Text style={s.title}>Ponto de encontro</Text>
        <Text style={s.muted}>{label || "Localização ainda não definida"}</Text>
      </View>
    );
  }

  if (Platform.OS === "web") {
    return (
      <Pressable onPress={openMaps} style={s.fallback}>
        <Text style={s.pin}>⌖</Text>
        <Text style={s.title}>{label || "Ponto de encontro"}</Text>
        <Text style={s.muted}>Mapa interativo disponível no app · tocar para abrir no Google Maps</Text>
        <Text style={s.coords}>{lat.toFixed(5)}, {lng.toFixed(5)}</Text>
      </Pressable>
    );
  }

  const MapView = require("react-native-maps").default;
  const { Marker } = require("react-native-maps");

  return (
    <View style={s.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
        showsCompass
        showsScale
        showsBuildings
        showsPointsOfInterest
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          title={label || "BORA"}
          description="Ponto de encontro da corrida"
        />
      </MapView>
      <Pressable onPress={openMaps} style={s.mapButton}>
        <Text style={s.mapButtonText}>ABRIR NO GOOGLE MAPS ↗</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    height: 190,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: "#132832",
    position: "relative",
  },
  fallback: {
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: "#0A1822",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  pin: { color: C.gold, fontSize: 30, marginBottom: 6 },
  title: { color: C.text, fontSize: 12, fontWeight: "900", textAlign: "center" },
  muted: { color: C.muted, fontSize: 9, textAlign: "center", marginTop: 5, lineHeight: 14 },
  coords: { color: C.gold, fontSize: 8, fontWeight: "800", marginTop: 8 },
  mapButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: C.gold,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  mapButtonText: { color: "#071018", fontSize: 8, fontWeight: "900" },
});
