import React from 'react';
import { Dimensions, Text, View } from 'react-native';

const Ex2 = () => {
    const {width, height} = Dimensions.get('window');
    return (
        // Sắp xếp dọc
        // <View style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', height: height, width: width }}>
        //     <Text style={{ backgroundColor: '#EF4444', borderRadius: 8, width: 100, height: 40 }}></Text>
        //     <Text style={{ backgroundColor: '#F97316', borderRadius: 8, width: 80, height: 50 }}></Text>
        //     <Text style={{ backgroundColor: '#22C55E', borderRadius: 8, width: 120, height: 60 }}></Text>
        //     <Text style={{ backgroundColor: '#3B82F6', borderRadius: 8, width: 90, height: 30 }}></Text>
        //     <Text style={{ backgroundColor: '#8B5CF6', borderRadius: 8, width: 110, height: 55 }}></Text>
        // </View>
        // -----------------------------------------------------------------------------------------------------------
        // Sắp xếp ngang
        // <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', height: height, width: width }}>
        //     <Text style={{ backgroundColor: '#EF4444', borderRadius: 8, width: 100, height: 40 }}></Text>
        //     <Text style={{ backgroundColor: '#F97316', borderRadius: 8, width: 80, height: 50 }}></Text>
        //     <Text style={{ backgroundColor: '#22C55E', borderRadius: 8, width: 120, height: 60 }}></Text>
        //     <Text style={{ backgroundColor: '#3B82F6', borderRadius: 8, width: 90, height: 30 }}></Text>
        //     <Text style={{ backgroundColor: '#8B5CF6', borderRadius: 8, width: 110, height: 55 }}></Text>
        // </View>
        // -----------------------------------------------------------------------------------------------------------
        // Sắp xếp lưới
        <View style={{ display: 'flex',  flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', height: height, width: width, flexWrap: 'wrap' }}>
            <Text style={{ backgroundColor: '#EF4444', borderRadius: 8, width: 100, height: 40 }}></Text>
            <Text style={{ backgroundColor: '#F97316', borderRadius: 8, width: 80, height: 50 }}></Text>
            <Text style={{ backgroundColor: '#22C55E', borderRadius: 8, width: 120, height: 60 }}></Text>
            <Text style={{ backgroundColor: '#3B82F6', borderRadius: 8, width: 90, height: 30 }}></Text>
            <Text style={{ backgroundColor: '#8B5CF6', borderRadius: 8, width: 110, height: 55 }}></Text>
        </View>
    )
}

export default Ex2;
