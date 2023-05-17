import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { allTemperaments } from "../../redux/actions";

let tempId = 0;
const Form = ()=>{
    const temperamentList = useSelector(state => state.temperaments);

    const dispatch = useDispatch();
    
    const [photoUrl, setPhotoUrl] = useState("");
    const [dogData, setDogData] = useState({
        name: '',
        image: '',
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
        temperament: [],
        life_span: ''  
    })

    useEffect(()=>{
        //si al inicializar el componente no hay temperaments cargados, los trae
        if(!temperamentList.length){
            dispatch(allTemperaments());
            //console.log('dispatch')
        }
    }, [])

    const handleChanges = (event) => {
        const { name, value } = event.target;
        //console.log(dogData)
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
            const onlyLetters = /^[A-Za-z]+$/;
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


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const filename = file.name;
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
        if (!imageRegex.test(filename)) {
          // El archivo seleccionado no es una imagen válida
          setErrors({
            ...errors,
            image: 'Please select a valid image file'
          })
          document.imgdog.src = 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg';
          return;
        }
      
        const photoUrl = URL.createObjectURL(file);
        setPhotoUrl(photoUrl);
        console.log(photoUrl);
        document.imgdog.src = photoUrl;
        setDogData({
            ...dogData,
            image: photoUrl,
        })
        setErrors({
            ...errors,
            image: ''
          })
      };

      const [addedTemperaments, setAddedTemperaments] = useState([]);
     
      const handleTemperaments = (event)=>{
        const foundTemperament = temperamentList.find(temperament => temperament.temperament === event.target.value)
        //le paso el id al state porque despues el numero es lo que se enviaq por form
        const foundAddedTemperament = addedTemperaments.find(temperament => temperament.name === event.target.value);
        if(!foundAddedTemperament) {
            dogData.temperaments.push(foundTemperament.id);
            console.log(dogData.temperaments)
            const currTemperament = {
                id: foundTemperament.id,
                name: event.target.value
            }
            setAddedTemperaments((prevTemperaments) => [
                ...prevTemperaments,
                currTemperament,
            ]);
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
      }

      const handleSubmit = async (event) => {
       
            event.preventDefault();
            dogData.weight = dogData.weight.join(' - ')
            dogData.height = dogData.height.join(' - ')
            dogData.life_span = dogData.life_span + ' years';
            try {
                console.log(dogData)
              const response = await axios.post("http://localhost:3001/dogs", dogData);
              console.log(response.data); // Puedes manejar la respuesta como desees
            } catch (error) {
              console.error(error.message);
            }
        
      };

    return(
        <div>
            <h2>Create Breed</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Breed name</label>
                <input type="text" name="name" placeholder="Breed name" onChange={handleChanges} required/>
                {
                    errors.name !== '' && <p>{errors.name}</p>
                }
                <div>
                    <label htmlFor="minWeight">Minimum weight</label>
                    <input type="number" name="minWeight" placeholder="(kg)" onChange={handleChanges} required/>

                    <label htmlFor="maxWeight">Maximum weight</label>
                    <input type="number" name="maxWeight" placeholder="(kg)" onChange={handleChanges} required/>
                    {
                    errors.weight !== '' && <p>{errors.weight}</p>
                    }
                </div>
                <div>
                    <label htmlFor="minHeight">Minimum height</label>
                    <input type="number" name="minHeight" placeholder="(cm)" onChange={handleChanges} required/>

                    <label htmlFor="maxHeight">Maximum height</label>
                    <input type="number" name="maxHeight" placeholder="(cm)" onChange={handleChanges} required/>
                    {
                    errors.height !== '' && <p>{errors.height}</p>
                    }
                </div>
                <label htmlFor="life_span">Life Span</label>
                <input type="number" name="life_span" placeholder="(in years)" onChange={handleChanges} required />

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
                <div>
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
                </div>

                <label htmlFor="image">Upload image</label>
                <input type="file" name="image" value='' onChange={handleImageChange}/>
                {
                    errors.image !== '' && <p>{errors.image}</p>
                }
                <br /><img name='imgdog' src="https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg" alt="Created dog" />
                <button>Submit</button>

                

            </form>
            {/* {photoUrl && <img src={photoUrl} alt="Uploaded Photo" />} */}
        </div>
    )
}

export default Form;