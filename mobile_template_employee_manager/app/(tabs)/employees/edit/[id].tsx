import EmployeeForm from "@/components/EmployeeForm";
import { DUMMY_EMPLOYEES } from "@/data/mockData";
import React from "react";
export default function EditEmployeeScreen() {
  const employeeToEdit = DUMMY_EMPLOYEES[0];
  return <EmployeeForm initialData={employeeToEdit} />;
}
