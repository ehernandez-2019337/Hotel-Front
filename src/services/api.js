import axios from "axios";


const apiClient = axios.create({
    baseURL: 'http://localhost:2656',
    timeout: 1000
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => Promise.reject(err)
)

export const registerRequest = async (user) => {
    try {
        return await apiClient.post('/user/registerClient', user);
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};

export const loginRequest = async (user) => {
    try {
        return await apiClient.post('/user/login', user);
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};


export const getHotelRequest = async() => {
    try { 
        return await apiClient.get('hotel/get')
    }catch (err) {
        return {
            error: true,
            err
        }
    }
}


export const saveHotelRequest = async(hotel) => {
    try{
        return await apiClient.post('hotel/save', hotel, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const updateHotelRequest = async(id, hotel) => {
    try{
    return await apiClient.put(`/hotel/update/${id}`, hotel,{
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const deleteHotelRequest = async (id, image) => {
    try {
        return await apiClient.delete(`/hotel/delete/${id}`, { data: { image } });
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

export const getEventsRequest = async(id) => {
    try { 
        return await apiClient.get(`event/getAllEvents/${id}`)
    }catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const saveEventRequest = async (event) => {
    try {
        return await apiClient.post(`/event/create`, event, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateEventRequest = async(id, event) => {
    try {
        return await apiClient.put(`/event/update/${id}`,event, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}
export const deleteEventRequest = async(id, image) => {
    try{
        return await apiClient.delete(`/event/deleteEvent/${id}`, { data: { image } })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const searchEventRequest = async (id, type) => {
    try {
      const response = await apiClient.post(`/event/searchEvent/${id}`, { type })
      return response.data;
    } catch (err) {
      return {
        error: true,
        err
      }
    }
  }

  export const searchHotelRequest = async (name) => {
    try {
        return await apiClient.post('/hotel/search', { name })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const saveRoomRequest = async (roomData) => {
    try {
        const formData = new FormData();
        for (const key in roomData) {
            formData.append(key, roomData[key]);
        }
        return await apiClient.post('/room/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const updateRoomRequest = async(id, roomName) => {
    try {
        return await apiClient.put(`/room/update/${id}`,roomName, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}
export const deleteRoomRequest = async(id, image) => {
    try{
        return await apiClient.delete(`/room/delete/${id}`, { data: { image } })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}
export const getRoomsRequest = async(id) => {
    try{
        return await apiClient.get(`/room/get/${id}`)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const searchRoomRequest = async (id, searchTerm) => {
    try {
      const response = await apiClient.post(`/room/searchRoom/${id}`, { search: searchTerm });
      return response.data;
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };



export const saveCategoryRequest = async (category) => {
    try {
        return await apiClient.post(`/category/save`, category, {
        })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateCategoryRequest = async(id, event) => {
    try {
        return await apiClient.put(`/category/update/${id}`,event, {
        })
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}
export const deleteCategoryRequest = async(id, image) => {
    try{
        return await apiClient.delete(`/category/delete/${id}`)
    }catch(err){
        return {
            error: true,
            err
    }
}     
}


export const searchCategoryRequest = async (searchTerm) => {
    try {
      const response = await apiClient.post('/category/search', { search: searchTerm });
      return response.data;
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };

  export const getCategoriesRequest = async() => {
    try{
        return await apiClient.get('/category/get')
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

//para la el perfil del usuario
export const getProfile = async () => {
    try {
        const response = await axios.get('/user/profile');
        return { data: response.data };
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await axios.put('/user/profile', formData);
        return { data: response.data };
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};


export const saveServiceRequest = async (category) => {
    try {
        return await apiClient.post(`/service/createService`, category, {
        })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateServiceRequest = async(id, service) => {
    try {
        return await apiClient.put(`/service/updateService/${id}`,service, {
        })
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}
export const deleteServiceRequest = async(id, image) => {
    try{
        return await apiClient.delete(`/service/deleteService/${id}`)
    }catch(err){
        return {
            error: true,
            err
    }
}     
}

export const searchServiceRequest = async (id, type) => {
    try {
      const response = await apiClient.post(`/service/searchService/${id}`, { type });
      return response.data
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };

  export const getServicesRequest = async(id) => {
    try{
        return await apiClient.get(`/service/readService/${id}`)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const getReservationRequest = async() => {
    try{
        return await apiClient.get('/reservation/getReservations')
    }catch(err){
        return{
            error: true,
            err
        }
    }
}

export const saveReservation = async (reservationData) => {
    try {
        return await apiClient.post('/reservation/saveReservation', reservationData);
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};

export const deleteReservationRequest = async (reservationId) => {
    try {
      return await apiClient.delete(`/reservation/deleteReservation/${reservationId}`);
    } catch (err) {
      return {
        error: true,
        err
      };
    }
  };

  export const getUserRequest = async() => {
    try{
        return await apiClient.get('/user/details')
    }catch(err){
        return{
            error: true,
            err
        }
    }
}

export const updateUserRequest  = async(id, user) => {
    try{
        return await apiClient.put(`user/update/${id}`, user)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const deleteUserRequest  = async(id) => {
    try{
        return await apiClient.delete(`user/delete/${id}`)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}


export const searchUserRequest = async(type) => {
    try{
        console.log(type)
        return await apiClient.post('/user/search', {type})
        
    }catch(err){
        return {
            error: true, 
            err
        }
    }
}

export const downloadInvoiceRequest = async (reservationId) => {
    try {
      const response = await apiClient.get(`/invoice/generateInvoice/${reservationId}`, {
        responseType: 'blob', // Asegúrate de que la respuesta se maneje como un blob
      });
  
      if (response.status === 200) {
        return { data: response.data };
      } else {
        return { error: true, message: 'Error al generar la factura' };
      }
    } catch (error) {
      console.error('Error al descargar la factura:', error);
      return { error: true, message: error.message };
    }
  };