let formData = {
    email: "",
    message: "",
}

const form = document.querySelector(".feedback-form")

const formFill = () => {
    try {
        const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));
        if (formDataFromLS === null) {
            return
        }
        formData = formDataFromLS;
        const formDataFromLSKeys = Object.keys(formDataFromLS)
        formDataFromLSKeys.forEach(key => {
            form.elements[key].value = formDataFromLS[key]
        })
    } catch (err) {
      console.log(err);
    }
}
formFill();

const formChange = ({ target: formFieldEl }) => {
  try {
    const formFieldName = formFieldEl.name;
    const formFieldValue = formFieldEl.value.trim();
    formData[formFieldName] = formFieldValue;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (err) {
    console.log(err);
  }
};

const formSubmit = event => {
    event.preventDefault(); 
    const fromDataValues = Object.values(formData);
    if (fromDataValues.includes("")) {
        alert(`Please, fill all fields!`)
        return;
    }
    console.log(formData)
    localStorage.removeItem('feedback-form-state');
    formData = {
      email: '',
      message: '',
    };
    form.reset();
}

form.addEventListener("input", formChange);
form.addEventListener('submit', formSubmit)