import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { allTemperaments, allDogs } from "../../redux/actions";
import PopUp from '../PopUp/PopUp';

import styles from './Form.module.css'

const Form = ()=>{
    
    //traigo temperamentos del estado global
    const temperamentList = useSelector(state => state.temperaments);
    const error = useSelector(state => state.error);

    const dispatch = useDispatch();
    
    const [dogData, setDogData] = useState({
        name: '',
        image: 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg',
        weight: ['', ''],
        height: ['', ''],
        temperaments: [],
        life_span: ''  
    })
    const [errors, setErrors] = useState({
        name: '',
        image: '',
        weight: ['', ''],
        height: ['', ''],
        temperament: 'Please select at least one temperament for your dog',
        life_span: ''  
    })
    
    //disable submit
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const validateSubmit = () => {
        setSubmitButtonDisabled(
            //cambiar valor de submit al opuesto si se cumplen las condiciones
          !(
            errors.name === '' &&
            errors.weight === '' &&
            errors.height === '' &&
            errors.temperament === '' &&
            errors.life_span === ''
          )
        );
      };
      
    useEffect(() => {
      validateSubmit();
      if(error !== ''){
        setPopUp(true);
        setPopUpMessage(error)
      }
    }, [errors, error]);

    useEffect(()=>{
        //si al inicializar el componente no hay temperaments cargados, los trae
        if(!temperamentList.length){
            dispatch(allTemperaments());
        }
    }, [dispatch, temperamentList.length])

    const handleChanges = (event) => {
        const { name, value } = event.target;
            switch (name) {
                case 'name':
                case 'life_span':
                    setDogData({
                        ...dogData,
                        [name]: value
                    });
                break;

                case 'maxWeight':
                    setDogData({
                        ...dogData,
                        //solo actualizo la segunda posicion
                        weight: [dogData.weight[0], value]
                    });
                break;

                case 'minWeight':
                    setDogData({
                        ...dogData,
                        //solo actualizo la primera posicion
                        weight: [value, dogData.weight[1]]
                    });
                break;

                case 'maxHeight':
                    setDogData({
                        ...dogData,
                        //solo actualizo la segunda posicion
                        height: [dogData.height[0], value]
                    });
                break;

                case 'minHeight':
                    setDogData({
                        ...dogData,
                        //solo actualizo la primera posicion
                        height: [value, dogData.height[1]]
                    });
                break;

                default:
                setDogData({
                    ...dogData
                })
            }
          validate(name, value)
    }

    const validate = (name, value) => {
        switch (name) {
          case 'name':
            const onlyLetters = /^[a-zA-Z\s]+$/;
            const isValid = onlyLetters.test(value);
            setErrors({
              ...errors,
              name: !isValid ? 'The breed name should only contain letters' : '',
            });
            break;
          case 'minHeight':
            setErrors({
              ...errors,
              height: value > Number(dogData.height[1]) ? 'Minimum height cannot be greater than the maximum' : '',
            });
            break;
          case 'maxHeight':
            setErrors({
              ...errors,
              height: value < Number(dogData.height[0]) ? 'Maximum height cannot be lesser than the minimum' : '',
            });
            break;
          case 'minWeight':
            setErrors({
              ...errors,
              weight: value > Number(dogData.weight[1]) ? 'Minimum weight cannot be greater than the maximum' : '',
            });
            break;
          case 'maxWeight':
            setErrors({
              ...errors,
              weight: value < Number(dogData.weight[0]) ? 'Maximum weight cannot be lesser than the minimum' : '',
            });
            break;
          default:
            setErrors({
              ...errors,
            });
        }
      };

      function convertBase64(file, callback) {
        var lector = new FileReader();
        lector.onloadend = function () {
          callback(lector.result);
        };
        lector.readAsDataURL(file);
      }


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const filename = file.name;
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
        if (!imageRegex.test(filename)) {
            // El archivo seleccionado no es una imagen válida
            setErrors({
                ...errors,
                image: 'Please select a valid image file or preview image will be used'
            })
            document.imgdog.src = 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg';
            return;
        }

        //la imagen es valid:

        convertBase64(file, function (base64) {
            // base 64 es el valor formateado que obtengo para pasarle al atributo src de una imagen
            document.imgdog.src = base64;
            
            setDogData({
                ...dogData,
                image: base64,
            })
            setErrors({
                ...errors,
                image: ''
              })
          });
        
      };

      const [addedTemperaments, setAddedTemperaments] = useState([]);
     
      const handleTemperaments = (event)=>{
        const foundTemperament = temperamentList.find(temperament => temperament.temperament === event.target.value)
        //le paso el id al state porque despues el numero es lo que se envia por form
        const foundAddedTemperament = addedTemperaments.find(temperament => temperament.name === event.target.value);
        if(!foundAddedTemperament) {
            //si no se repite pusheo el id al array temperaments de dog data
            dogData.temperaments.push(foundTemperament.id);

            //el temperamento actual lo guardo como objeto
            const currTemperament = {
                id: foundTemperament.id,
                name: event.target.value
            }
            //el objeto lo agrego a los temperamentos agregados que muestro en pantalla
            setAddedTemperaments((prevTemperaments) => [
                ...prevTemperaments,
                currTemperament,
            ]);
            //no hay error para mostrar
            setErrors({
                ...errors,
                temperament: ''
            })
        }
      }

    

      const deleteTemperament = (event) => {
          //tomo el valor del id despues de 'del_'
          const eliminateId = event.target.id.slice(4);
          //filtro estado con temperamentos para eliminar el seleccionado
        const updatedTemperaments = addedTemperaments.filter(temperament => temperament.id !== Number(eliminateId))
        setAddedTemperaments(updatedTemperaments);
        
        //tambien lo tengo que sacar del array de dogData
        const foundTemperament = temperamentList.find(temperament => temperament.id === Number(eliminateId))
        dogData.temperaments = dogData.temperaments.filter(temperament => temperament !== foundTemperament.id)
        //si despues de eliminar el actual no tengo ningun temperamento en dogData.temperaments, muestro el error
        if(!dogData.temperaments.length) setErrors({
            ...errors,
            temperament: 'Please select at least one temperament for your dog'
        })
    }

      const [popUp, setPopUp] = useState(false)
      const [popUpMessage, setPopUpMessage] = useState('')

      const handleSubmit = async (event) => {       
            event.preventDefault();
            try {
                if(typeof dogData.weight !== 'string') dogData.weight = dogData.weight.join(' - ')
                if(typeof dogData.height !== 'string') dogData.height = dogData.height.join(' - ')
              const response = await axios.post("http://localhost:3001/dogs", dogData);
              if(response.data){
                //reseteo el form y todos sus valores
                const creationForm = document.getElementById("creationForm");
                creationForm.reset();
                document.imgdog.src = 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg';
                setDogData({
                    name: '',
                    image: 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg',
                    weight: ['', ''],
                    height: ['', ''],
                    temperaments: [],
                    life_span: ''  
                });
                setAddedTemperaments([]);
                setErrors({
                    name: '',
                    image: '',
                    weight: ['', ''],
                    height: ['', ''],
                    temperament: '',
                    life_span: ''  
                });
                setPopUp(true)
                setPopUpMessage('Dog created successfully')
                dispatch(allDogs())
                //alert("Dog created successfully");

              }
            } catch (error) {
                setErrors({
                    ...errors,
                    name: error.response.data.error.includes('name') ? error.response.data.error : errors.name,
                    temperament: error.response.data.error.includes('temperament') ? error.response.data.error : errors.temperament
                })
            }
        
      };

    return(
        <div>
            {
                popUp === true && <PopUp trigger={popUp} setTrigger={setPopUp}>
                    <h3>{popUpMessage}</h3>
                </PopUp>
            }
            <form onSubmit={handleSubmit} id='creationForm'>
                <div className={styles.twoThirds}>
                    <h2>Create Breed</h2>
                    <div className={styles.subDiv}>
                        <div>
                            <label htmlFor="name">Breed name</label><br/>
                            <input type="text" name="name" placeholder="Breed name" onChange={handleChanges} required/>
                            {
                                errors.name !== '' && <p className={styles.errorP}>{errors.name}</p>
                            }
                        </div>
                        <div>
                        <label htmlFor="life_span">Life Span</label><br/>
                        <input type="number" name="life_span" placeholder="(in years)" onChange={handleChanges} required />
                        </div>
                    </div>
                    <div className={styles.subDiv}>
                        <div>
                            <label htmlFor="minWeight">Minimum weight</label><br/>
                            <input type="number" name="minWeight" placeholder="(kg)" onChange={handleChanges} required/>
                        </div>
                        <div>
                            <label htmlFor="maxWeight">Maximum weight</label><br/>
                            <input type="number" name="maxWeight" placeholder="(kg)" onChange={handleChanges} required/>
                        </div>
                    </div>
                    <div>
                        {
                        errors.weight !== '' && <p className={styles.errorP}>{errors.weight}</p>
                        }
                    </div>
                    <div className={styles.subDiv}>
                        <div>
                            <label htmlFor="minHeight">Minimum height</label><br/>
                            <input type="number" name="minHeight" placeholder="(cm)" onChange={handleChanges} required/>
                        </div>

                        <div>
                            <label htmlFor="maxHeight">Maximum height</label><br/>
                            <input type="number" name="maxHeight" placeholder="(cm)" onChange={handleChanges} required/>
                        </div>

                    </div>
                    <div>
                        {
                        errors.height !== '' && <p className={styles.errorP}>{errors.height}</p>
                        }
                    </div>
                    <div className={styles.subDiv}>
                    <label htmlFor="temperament">Temperaments</label>
                    <select name="temperament" onChange={handleTemperaments}>
                        {
                            temperamentList?.map(temperament =>{
                                return(
                                    <option key={temperament.id} value={temperament.temperament}>{temperament.temperament}</option>
                                )
                            })
                        }           
                    </select>

                    </div>
                    <div className={styles.temperamentBox}>
                        {
                            addedTemperaments?.map(temperament =>{
                                return(
                                    <div key={temperament.id}>
                                        <p key={`temp_${temperament.id}`} id={`temp_${temperament.id}`}>{temperament.name}</p>
                                        <button key={`but_${temperament.id}`} id={`del_${temperament.id}`} onClick={deleteTemperament} type="button">x</button>
                                    </div>
                                    
                                )
                            }
                            )
                        }
                        {
                            errors.temperament !== '' && <p className={styles.errorP}>{errors.temperament}</p>
                        }
                    </div>
                    <div className={styles.subDiv}>
                        <div className={styles.divImg}>
                            <div className={styles.fileUpload}>
                                <label for="file-input" name='file-input' className={styles.customButton}>Upload Image</label>
                                <input type="file" id="file-input" onChange={handleImageChange} />
                            </div>
                            {
                                errors.image !== '' && <p className={styles.errorP}>{errors.image}</p>
                            }
                        </div>
                    </div>

                    <button className={styles.submitButton} id='submitButton' disabled={submitButtonDisabled}>Submit</button>
                </div>

                <div className={styles.oneThird}>
                    <div>
                        <p>Image preview</p><br />
                        <img name='imgdog' src="https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg" alt="Created dog" />
                        
                    </div>
                </div>



            </form>
        </div>
    )
}

export default Form;