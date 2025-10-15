import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import store, { RootState } from '@/redux/store';
import { translations } from '@/utils/translation';
import { setLanguage } from '@/redux/slices/language.slice';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.language);

  const currentLang = translations[lang];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdown}>
        <Button
          title={lang === 'vi' ? 'Tiếng Việt' : 'English'}
          onPress={() => dispatch(setLanguage(lang === 'vi' ? 'en' : 'vi'))}
        />
      </View>

      <Text style={styles.text}>{currentLang.description}</Text>
      <Text style={styles.academy}>{currentLang.academy}</Text>
    </SafeAreaView>
  );
};

export default function Ex5() {
  return (
    <Provider store={store}>
      <LanguageSwitcher />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  dropdown: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  academy: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
