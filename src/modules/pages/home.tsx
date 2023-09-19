import React, {useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import EquipmentComponent from '../components/equipment-item';
import {Equipment} from '../../helpers/models';
import {equipmentController} from '../../api';
import SearchEquipment from '../components/search-equipment';

function Home({navigation, route}) {
  const [equipments] = useState<Equipment[]>(equipmentController.list());
  const [filter, setFilter] = useState('');

  const filteredEquipments = equipments.filter(equipment =>
    equipment.name?.includes(filter),
  );

  return (
    <View>
      <SearchEquipment
        value={filter}
        onChangeText={(text: React.SetStateAction<string>) => setFilter(text)}
      />
      <FlatList
        data={filteredEquipments}
        renderItem={EquipmentComponent}
        numColumns={2}
        contentContainerStyle={styles.equipmentList}
        keyExtractor={item => item._id ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  equipmentList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 175,
  },
});

export default Home;
