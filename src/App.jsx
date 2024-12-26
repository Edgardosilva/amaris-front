import CalendarWithTimes from "./components/CalendarTimes"
import FormAppoiment from "./components/FormAppoiment"
import Navbar from "./components/Navbar"
import Procedures from "./components/Procedures"
import DateResume from "./components/DateResume"
import Sidebar from "./components/Sidebar"
import { useState } from 'react';

function App() {

  const avaibleBoxes = ['box 1', 'box 2', 'box 3', 'Gym']
  const [loader, setLoader] = useState(false);
  const [isProcedure, setIsProcedure] = useState(false)
  const [isFormData, setIsFormData] = useState(false) 
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    procedimiento: {},
    fecha: "",
    hora: "",
    boxAsignado: ""
});

  return (
    <main className="">
      <section className="">
        <div className="">
          {!loader && !isProcedure && (
            <FormAppoiment
              formData={formData}
              setFormData={setFormData}
              setLoader={setLoader}
            />
          )}
          {loader && !isProcedure && (
            <Procedures
              formData={formData}
              setFormData={setFormData}
              isProcedure={isProcedure}
              setIsProcedure={setIsProcedure}
            />
          )}
          {isProcedure && !isFormData && (
            <CalendarWithTimes 
              formData={formData} 
              setFormData={setFormData} 
              isFormData={isFormData}
              setIsFormData={setIsFormData}/>
          )}
          {
            isFormData && (
              <DateResume
                formData={formData}
                setFormData={setFormData}
              />
            )
          }
        </div>
      </section>
    </main>
  )
}

export default App
