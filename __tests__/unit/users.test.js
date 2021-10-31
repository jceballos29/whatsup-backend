const userService = require("../../src/services/user.service");
const faker = require("faker");
const getDataValues = require("../../src/utils/sequelize")

describe("Probando los servicios de Usuarios",  () =>{

    let userId = 0;
    let userCreated = {};
    let newUser = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
        phone: faker.phone.phoneNumber('+57##########')

    }

    beforeAll(async () => {
        userCreated = await userService.create(newUser);
    })

    afterAll(async () => {
        try {
            await userService.delete(userId)
        } catch (error) {
            throw error
        }
    })

    it("Debería obtener un arreglo al llamar el método getAll", async () => {
        //AAA
        //arrange

        //act
        const results = await userService.getAll()
        //assert
        expect(results).toEqual(expect.any(Array))
    });

    it("Debería obtener un objeto al llamar el método getUserById", async () => {
        //AAA
        //arrange
        const id = 1;
        //act
        const result = await userService.getUserById(id);
        
        //assert
        expect(result).toEqual(expect.any(Object))
    });

    it("Debería de regresar un objeto con los datos del usuario que acabamos de insertar en la base de datos", async ()=>{
        //AAA
        //arrange (Ordenar) -> Se colovan los datos que usaremos en las pruebas
        const user = {
            firstname: "Pepito",
            lastname : "Peres",
            email: "pepito@mail.com",
            password: "probando123",
            phone: "+571234567890"
        };
        //act
        const result =  await userService.create(user);
        userId = result.id;
        //assert
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("id")
        expect(result).toHaveProperty("firstname", "Pepito")
    });

    it("Debería de regresar TRUE al actualizar el registro de forma satisfactoria", async () =>{
        //AAA
        
        //arrange
        userCreated.firstname = "Hector"
        //act
        userCreated = getDataValues(userCreated)
        const result = await userService.update(userCreated, userCreated.id);
        console.log(result)
        //assert
        expect(result).toBeTruthy();
    });

    it("Debería de regresar TRUE al eliminar el registro de forma satisfactoria", async () =>{
        //AAA
        //arrange
        //act
        const result = await userService.delete(userCreated.id)
        //assert
        expect(result).toBeTruthy();
    });

});