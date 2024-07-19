export const useLogout = () => {
    console.log('Estoy cerrando la sesión')
    localStorage.removeItem('token')
    window.location.href = '/'    
}
