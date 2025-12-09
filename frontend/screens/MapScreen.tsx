// screens/MapScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import * as Location from 'expo-location';

const CATEGORY_COLORS: Record<string, string> = {
  nature: '#16a34a',
  park: '#16a34a',
  beach: '#0ea5e9',
  attraction: '#f59e0b',
  museum: '#7c3aed',
  temple: '#dc2626',
  heritage: '#f97316',
  shopping: '#2563eb',
  food: '#10b981',
  nightlife: '#a855f7',
  district: '#64748b',
};

type Landmark = {
  id: string;
  title: string;
  desc: string;
  lat: number;
  lng: number;
  date?: string;
  time?: string;
  price?: string;
  category: keyof typeof CATEGORY_COLORS;
};

type Coord = {
  latitude: number;
  longitude: number;
};

const landmarks: Landmark[] = [
  { id: 'sgbg', title: 'Singapore Botanic Gardens', desc: 'UNESCO World Heritage garden', lat: 1.3138, lng: 103.8159, date: 'Daily', time: '05:00–24:00', price: 'Free', category: 'nature' },
  { id: 'nog', title: 'National Orchid Garden', desc: 'Signature orchid collection', lat: 1.3133, lng: 103.8158, date: 'Daily', time: '08:30–19:00 (last entry 18:00)', price: 'From S$15 adult; S$5 student/senior; <12 free', category: 'nature' },
  { id: 'asm', title: 'ArtScience Museum', desc: 'Iconic lotus-shaped museum', lat: 1.2864, lng: 103.8591, date: 'Daily', time: '10:00–19:00 (check exhibitions)', price: 'Varies by exhibition', category: 'museum' },
  { id: 'esplanade', title: 'Esplanade – Theatres on the Bay', desc: 'Performing arts centre', lat: 1.2893, lng: 103.8559, date: 'Daily', time: '10:00–22:00 (venues vary)', price: 'Free public areas; ticketed shows', category: 'attraction' },
  { id: 'flyer', title: 'Singapore Flyer', desc: 'Giant observation wheel', lat: 1.2893, lng: 103.8631, date: 'Daily', time: 'Approx 14:00–22:00 (check calendar)', price: 'From ~S$25–40', category: 'attraction' },
  { id: 'helix', title: 'Helix Bridge', desc: 'DNA-inspired pedestrian bridge', lat: 1.2879, lng: 103.8607, date: 'Daily', time: '24 hours', price: 'Free', category: 'park' },
  { id: 'barrage', title: 'Marina Barrage', desc: 'Dam & recreation spot with skyline views', lat: 1.2805, lng: 103.8703, date: 'Daily', time: '24 hours', price: 'Free', category: 'park' },
  { id: 'ngs', title: 'National Gallery Singapore', desc: 'Southeast Asian art in former City Hall', lat: 1.2906, lng: 103.8515, date: 'Daily', time: '10:00–19:00', price: 'From ~S$20–30; SG/PR concessions vary', category: 'museum' },
  { id: 'acm', title: 'Asian Civilisations Museum', desc: 'Asian antiquities along the river', lat: 1.2879, lng: 103.8515, date: 'Tue–Sun', time: '10:00–19:00 (Fri till 21:00)', price: 'From ~S$10–20; concessions vary', category: 'museum' },
  { id: 'raffles', title: 'Raffles Hotel', desc: 'Colonial grand dame hotel', lat: 1.2940, lng: 103.8553, date: 'Daily', time: 'Public areas vary', price: 'Free entry; dining ticketed', category: 'heritage' },
  { id: 'clarke', title: 'Clarke Quay', desc: 'Riverside dining and nightlife', lat: 1.2906, lng: 103.8465, date: 'Daily', time: '10:00–late (venues vary)', price: 'Free entry', category: 'nightlife' },
  { id: 'boatq', title: 'Boat Quay', desc: 'Historic shophouses by the river', lat: 1.2859, lng: 103.8497, date: 'Daily', time: '10:00–late (venues vary)', price: 'Free entry', category: 'heritage' },
  { id: 'fcp', title: 'Fort Canning Park', desc: 'Hilltop park with WWII history', lat: 1.2953, lng: 103.8466, date: 'Daily', time: '24 hours', price: 'Free', category: 'park' },
  { id: 'chijmes', title: 'CHIJMES', desc: 'Heritage complex with dining', lat: 1.2952, lng: 103.8521, date: 'Daily', time: '10:00–22:00 (venues vary)', price: 'Free entry', category: 'heritage' },
  { id: 'orchard', title: 'Orchard Road', desc: 'Main shopping belt', lat: 1.3039, lng: 103.8327, date: 'Daily', time: '10:00–22:00 (malls vary)', price: 'Free entry', category: 'shopping' },
  { id: 'ion', title: 'Ion Orchard', desc: 'Flagship Orchard mall', lat: 1.3040, lng: 103.8318, date: 'Daily', time: '10:00–22:00', price: 'Free entry', category: 'shopping' },
  { id: 'emerald', title: 'Emerald Hill', desc: 'Peranakan shophouses off Orchard', lat: 1.3022, lng: 103.8392, date: 'Daily', time: '24 hours (residential street)', price: 'Free', category: 'heritage' },
  { id: 'lia', title: 'Little India Arcade', desc: 'Colorful bazaar in Little India', lat: 1.3053, lng: 103.8501, date: 'Daily', time: '10:00–22:00 (shops vary)', price: 'Free entry', category: 'district' },
  { id: 'veerama', title: 'Sri Veeramakaliamman Temple', desc: 'Hindu temple in Little India', lat: 1.3065, lng: 103.8517, date: 'Daily', time: 'Approx 05:30–12:15, 16:00–21:00', price: 'Free (donations welcome)', category: 'temple' },
  { id: 'kg', title: 'Kampong Glam', desc: 'Arab Street & heritage', lat: 1.3024, lng: 103.8599, date: 'Daily', time: 'Shops typically 10:00–21:00', price: 'Free entry', category: 'district' },
  { id: 'sultan', title: 'Sultan Mosque', desc: 'Golden-domed mosque', lat: 1.3021, lng: 103.8591, date: 'Daily', time: 'Visitor hours vary (non‑prayer times)', price: 'Free (donations welcome)', category: 'temple' },
  { id: 'haji', title: 'Haji Lane', desc: 'Street art and indie boutiques', lat: 1.3018, lng: 103.8589, date: 'Daily', time: 'Shops typically 11:00–20:00', price: 'Free entry', category: 'district' },
  { id: 'chhc', title: 'Chinatown Heritage Centre', desc: 'Stories of early settlers', lat: 1.2835, lng: 103.8447, date: 'Daily', time: '10:00–18:00', price: 'From ~S$15–20', category: 'museum' },
  { id: 'btrt', title: 'Buddha Tooth Relic Temple', desc: 'Grand temple & museum', lat: 1.2814, lng: 103.8448, date: 'Daily', time: '09:00–18:00 (temple); museum varies', price: 'Free (donations welcome)', category: 'temple' },
  { id: 'smariamman', title: 'Sri Mariamman Temple', desc: 'Oldest Hindu temple', lat: 1.2823, lng: 103.8454, date: 'Daily', time: 'Approx 07:00–12:00, 18:00–21:00', price: 'Free (donations welcome)', category: 'temple' },
  { id: 'maxwell', title: 'Maxwell Food Centre', desc: 'Famous hawker centre', lat: 1.2803, lng: 103.8448, date: 'Daily', time: 'Stalls vary (many 10:00–22:00)', price: 'Pay per stall', category: 'food' },
  { id: 'laupasat', title: 'Lau Pa Sat', desc: 'Victorian cast-iron hawker hub', lat: 1.2808, lng: 103.8502, date: 'Daily', time: '24 hours (stalls vary)', price: 'Pay per stall', category: 'food' },
  { id: 'tiong', title: 'Tiong Bahru', desc: 'Art Deco estate with cafes', lat: 1.2853, lng: 103.8321, date: 'Daily', time: 'Shops vary', price: 'Free entry', category: 'district' },
  { id: 'gillman', title: 'Gillman Barracks', desc: 'Contemporary art cluster', lat: 1.2765, lng: 103.8027, date: 'Tue–Sun', time: '11:00–19:00 (galleries vary)', price: 'Free entry; ticketed shows', category: 'museum' },
  { id: 'henderson', title: 'Henderson Waves', desc: 'Wavy pedestrian bridge', lat: 1.2733, lng: 103.8110, date: 'Daily', time: '24 hours', price: 'Free', category: 'park' },
  { id: 'faber', title: 'Mount Faber Peak', desc: 'Cable car and city views', lat: 1.2739, lng: 103.8175, date: 'Daily', time: '10:00–22:00 (attractions vary)', price: 'Cable car ticketed', category: 'attraction' },
  { id: 'sentosa-station', title: 'Sentosa – Beach Station', desc: 'Gateway to Sentosa beaches', lat: 1.2511, lng: 103.8219, date: 'Daily', time: '10:00–22:00 (attractions vary)', price: 'Island entry varies', category: 'beach' },
  { id: 'siloso', title: 'Siloso Beach', desc: 'Popular Sentosa beach', lat: 1.2531, lng: 103.8143, date: 'Daily', time: '24 hours', price: 'Free', category: 'beach' },
  { id: 'palawan', title: 'Palawan Beach', desc: 'Family-friendly beach', lat: 1.2457, lng: 103.8205, date: 'Daily', time: '24 hours', price: 'Free', category: 'beach' },
  { id: 'tanjong', title: 'Tanjong Beach', desc: 'Chill beach hangout', lat: 1.2456, lng: 103.8275, date: 'Daily', time: '24 hours', price: 'Free', category: 'beach' },
  { id: 'uss', title: 'Universal Studios Singapore', desc: 'Theme park on Sentosa', lat: 1.2540, lng: 103.8238, date: 'Varies', time: 'Check calendar (often 10:00–19:00/20:00)', price: 'From ~S$83; Express extra', category: 'attraction' },
  { id: 'sea', title: 'S.E.A. Aquarium', desc: 'One of the largest aquariums', lat: 1.2565, lng: 103.8228, date: 'Daily', time: 'Typically 10:00–17:00/18:00', price: 'From ~S$43–55', category: 'attraction' },
  { id: 'fots', title: 'Fort Siloso', desc: 'Coastal fort and skywalk', lat: 1.2584, lng: 103.8097, date: 'Daily', time: '10:00–18:00 (skywalk 9:00–21:00)', price: 'Free', category: 'heritage' },
  { id: 'zoo', title: 'Singapore Zoo', desc: 'Open concept zoo', lat: 1.4043, lng: 103.7930, date: 'Daily', time: '08:30–18:00 (last entry 17:00)', price: 'From ~S$48 adult', category: 'nature' },
  { id: 'riverw', title: 'River Wonders', desc: 'River-themed wildlife park', lat: 1.4030, lng: 103.7908, date: 'Daily', time: '10:00–19:00', price: 'From ~S$45 adult', category: 'nature' },
  { id: 'night', title: 'Night Safari', desc: 'Nocturnal wildlife park', lat: 1.4021, lng: 103.7875, date: 'Daily', time: '19:15–24:00', price: 'From ~S$55 adult', category: 'nature' },
  { id: 'birdp', title: 'Bird Paradise', desc: 'Large aviary park', lat: 1.4037, lng: 103.7422, date: 'Daily', time: '09:00–18:00 (last entry 17:00)', price: 'From ~S$48 adult', category: 'nature' },
  { id: 'macr', title: 'MacRitchie Reservoir', desc: 'Nature trails & treetop walk', lat: 1.3442, lng: 103.8320, date: 'Daily', time: '07:00–19:00', price: 'Free', category: 'park' },
  { id: 'btnr', title: 'Bukit Timah Nature Reserve', desc: 'Primary rainforest hill', lat: 1.3483, lng: 103.7750, date: 'Daily', time: '07:00–19:00', price: 'Free', category: 'park' },
  { id: 'lab', title: 'Labrador Nature Reserve', desc: 'Seaside park with WWII relics', lat: 1.2705, lng: 103.8021, date: 'Daily', time: '24 hours', price: 'Free', category: 'park' },
  { id: 'ecp', title: 'East Coast Park', desc: 'Cycling & seaside BBQs', lat: 1.3030, lng: 103.9175, date: 'Daily', time: '24 hours', price: 'Free', category: 'park' },
  { id: 'katong', title: 'Katong/Joo Chiat Shophouses', desc: 'Peranakan heritage facades', lat: 1.3067, lng: 103.9021, date: 'Daily', time: '24 hours (street view)', price: 'Free', category: 'heritage' },
  { id: 'jewel', title: 'Jewel Changi – Rain Vortex', desc: 'Indoor waterfall', lat: 1.3604, lng: 103.9894, date: 'Daily', time: '10:00–22:00 (vortex hours vary)', price: 'Free (attractions ticketed)', category: 'attraction' },
  { id: 'pm', title: 'Peranakan Museum', desc: 'Culture of the Peranakans', lat: 1.2943, lng: 103.8495, date: 'Tue–Sun', time: '10:00–19:00 (Fri till 21:00)', price: 'From ~S$10–16', category: 'museum' },
  { id: 'nms', title: 'National Museum of Singapore', desc: 'Oldest museum in Singapore', lat: 1.2967, lng: 103.8485, date: 'Daily', time: '10:00–19:00', price: 'From ~S$10–21', category: 'museum' },
  { id: 'sridges', title: 'The Southern Ridges', desc: '10km ridge-top walk', lat: 1.2785, lng: 103.8025, date: 'Daily', time: '07:00–19:00 (park hours)', price: 'Free', category: 'park' },
  { id: 'ntu-fol', title: 'Festival of Lights', desc: 'Annual lights & cultural showcase at NTU', lat: 1.3490, lng: 103.6840, date: '15 Nov 2025', time: '19:00–23:00', price: 'S$5', category: 'attraction' },
];

const AVATAR_SIZE = 50;

const MapScreen = () => {
  const mapRef = useRef<MapView | null>(null);
  const [coord, setCoord] = useState<Coord | null>(null);
  const [watchSub, setWatchSub] = useState<Location.LocationSubscription | null>(null);

  const startWatching = async () => {
    const perm = await Location.requestForegroundPermissionsAsync();
    if (perm.status !== 'granted') return;

    const last = await Location.getLastKnownPositionAsync();
    if (last?.coords) {
      const { latitude, longitude } = last.coords;
      const region: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setCoord({ latitude, longitude });
      mapRef.current?.animateToRegion(region, 400);
    }

    const sub = await Location.watchPositionAsync(
      { accuracy: Location.LocationAccuracy.Balanced, distanceInterval: 5 },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        setCoord({ latitude, longitude });
      }
    );
    setWatchSub(sub);
  };

  const stopWatching = () => {
    watchSub?.remove();
    setWatchSub(null);
  };

  const locateMe = async () => {
    if (!watchSub) {
      await startWatching();
    }
    if (coord && mapRef.current) {
      const region: Region = {
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapRef.current.animateToRegion(region, 600);
    }
  };

  useEffect(() => {
    return () => {
      watchSub?.remove();
    };
  }, [watchSub]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 1.315,
          longitude: 103.77,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation={false}
      >
        {landmarks.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lng }}
            title={p.title}
            description={p.desc}
            pinColor={CATEGORY_COLORS[p.category] || '#2563eb'}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.title}>{p.title}</Text>
                <Text style={styles.desc}>{p.desc}</Text>
                {p.category && <Text>Category: {p.category}</Text>}
                {p.date && <Text>Date: {p.date}</Text>}
                {p.time && <Text>Time: {p.time}</Text>}
                {p.price && <Text>Price: {p.price}</Text>}
              </View>
            </Callout>
          </Marker>
        ))}

        {coord && (
          <Marker coordinate={coord} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.avatarWrap}>
              <Image
                source={require('../assets/default-avatar.png')}
                style={styles.avatar}
              />
              <View style={styles.pulse} />
            </View>
            <Callout tooltip={false}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 6 }}>
                <Text style={{ fontWeight: '600' }}>You</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>

      <View style={styles.fabRow}>
        <TouchableOpacity style={styles.fab} onPress={locateMe}>
          <Text style={styles.fabText}>Locate me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fab, styles.fabSecondary]} onPress={stopWatching}>
          <Text style={styles.fabText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  callout: { padding: 8, maxWidth: 240 },
  title: { fontWeight: '600', marginBottom: 2 },
  desc: { color: '#4b5563', marginBottom: 6 },
  fabRow: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    flexDirection: 'row',
    gap: 10,
  },
  fab: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
  fabSecondary: {
    backgroundColor: '#64748b',
  },
  fabText: { color: 'white', fontWeight: '600' },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  pulse: {
    position: 'absolute',
    width: AVATAR_SIZE + 10,
    height: AVATAR_SIZE + 10,
    borderRadius: (AVATAR_SIZE + 10) / 2,
    borderWidth: 2,
    borderColor: 'rgba(37,99,235,0.3)',
  },
});
