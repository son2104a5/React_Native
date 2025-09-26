import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface FormData {
  name: string;
  age: string;
  phone: string;
  address: string;
}

const Step1: React.FC<{
  formData: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}> = ({ formData, onChange }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepTitle}>Bước 1: Thông tin cá nhân</Text>
    <TextInput
      style={styles.input}
      placeholder="Họ và tên"
      value={formData.name}
      onChangeText={(text) => onChange('name', text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Tuổi"
      value={formData.age}
      onChangeText={(text) => onChange('age', text)}
      keyboardType="numeric"
    />
  </View>
);

const Step2: React.FC<{
  formData: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}> = ({ formData, onChange }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepTitle}>Bước 2: Thông tin liên hệ</Text>
    <TextInput
      style={styles.input}
      placeholder="Số điện thoại"
      value={formData.phone}
      onChangeText={(text) => onChange('phone', text)}
      keyboardType="phone-pad"
    />
    <TextInput
      style={styles.input}
      placeholder="Địa chỉ"
      value={formData.address}
      onChangeText={(text) => onChange('address', text)}
    />
  </View>
);

const Step3: React.FC<{ formData: FormData }> = ({ formData }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepTitle}>Bước 3: Xác nhận thông tin</Text>
    <Text style={styles.reviewText}>Họ tên: {formData.name}</Text>
    <Text style={styles.reviewText}>Tuổi: {formData.age}</Text>
    <Text style={styles.reviewText}>Điện thoại: {formData.phone}</Text>
    <Text style={styles.reviewText}>Địa chỉ: {formData.address}</Text>
  </View>
);

const WizardForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    phone: '',
    address: '',
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Ở đây em có thể add logic submit real, như post API hoặc gì
      console.log('Form hoàn tất:', formData);
      // Ví dụ: alert('Đăng ký thành công!'); hoặc navigate screen khác
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} onChange={handleChange} />;
      case 2:
        return <Step2 formData={formData} onChange={handleChange} />;
      case 3:
        return <Step3 formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bước {step} / 3</Text>
      {renderStep()}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <Button title="QUAY LẠI" onPress={prevStep} color="#2196F3" />
        )}
        <Button
          title={step === 3 ? 'HOÀN TẤT' : 'TIẾP THEO'}
          onPress={nextStep}
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepContainer: {
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default WizardForm;