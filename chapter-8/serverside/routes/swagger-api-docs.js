// GET PLAYERS
/**
 * @swagger
 * /api/v1/players:
 *    get:
 *      summary: API ini digunakan untuk mengambil data semua player
 *      description: API ini digunakan untuk mengambil semua data player dalam format JSON
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: indikator sukses
 *                     example: Success
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: id pemain
 *                           example: 1
 *                         username:
 *                           type: string
 *                           description: nama pemain
 *                           example: PussySlayer613
 *                         email:
 *                           type: string
 *                           description: email pemain
 *                           example: pussy.slay3r@gmail.com   
 *                         password: 
 *                           type: string
 *                           description: kata sandi pemain
 *                           example: $2b$10$qv/OIU1hr7.PE/4zZXQWseDJq6XuPs6oQTvrRT8XrGCfoVnyyITZu
 *                         experience: 
 *                           type: integer
 *                           description: poin pengalaman pemain
 *                           example: 600000
 *                         lvl: 
 *                           type: integer
 *                           description: level pemain
 *                           example: 600
 *                         createdAt: 
 *                           type: timestamp
 *                           description: timestamp data dibuat
 *                           example: 2023-06-28T03:10:18.263Z
 *                         updatedAt: 
 *                           type: timestamp
 *                           description: timestamp data diperbarui
 *                           example: 2023-06-28T03:10:18.263Z    
 */

// CREATE PLAYER
/**
 * @swagger
 * /api/v1/players:
 *    post:
 *      summary: API ini digunakan untuk menambahkan data player baru
 *      description: API ini digunakan untuk menambahkan data player baru dalam format JSON
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                     username:
 *                       type: string
 *                       description: nama pemain
 *                       example: GoroseiMercury 
 *                     email:
 *                       type: string
 *                       description: email pemain
 *                       example: mercury@gmail.com 
 *                     password:
 *                       type: string
 *                       description: kata sandi pemain
 *                       example: voidzero             
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: indikator sukses
 *                     example: Success
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: id pemain
 *                         example: 5
 *                       username: 
 *                         type: string
 *                         description: nama pemain
 *                         example: GoroseiMercury 
 *                       email:
 *                         type: string
 *                         description: email pemain
 *                         example: Mercury@gmail.com
 *                       password:
 *                         type: string
 *                         description: kata sandi pemain
 *                         example: $2b$10$sjlhQnIc7pojX0P.oMCyauH0UFgFSKgtmUbqcv/jFLVjUlW/SbGuW
 *                       experience: 
 *                         type: integer
 *                         description: poin pengalaman pemain
 *                         example: 0
 *                       lvl:
 *                         type: integer
 *                         description: level pemain
 *                         example: 0
 *                       updateAt:
 *                         type: string
 *                         description: timestamp data dibuat
 *                         example: 2023-06-28T09:53:43.317Z
 *                       createdAt:
 *                         type: string
 *                         description: timestamp data diupdate
 *                         example: 2023-06-28T09:53:43.317Z                      
 */

// GET PLAYER BY ID
/**
 * @swagger
 * /api/v1/players/{id}:
 *    get:
 *      summary: API ini digunakan untuk mengambil data player
 *      description: API ini digunakan untuk mengambil data player berdasarkan id dalam format JSON
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: id pemain
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: indikator sukses
 *                     example: Success
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: id pemain
 *                           example: 1
 *                         username:
 *                           type: string
 *                           description: nama pemain
 *                           example: PussySlayer613
 *                         email:
 *                           type: string
 *                           description: email pemain
 *                           example: pussy.slay3r@gmail.com   
 *                         password: 
 *                           type: string
 *                           description: kata sandi pemain
 *                           example: $2b$10$qv/OIU1hr7.PE/4zZXQWseDJq6XuPs6oQTvrRT8XrGCfoVnyyITZu
 *                         experience: 
 *                           type: integer
 *                           description: poin pengalaman pemain
 *                           example: 600000
 *                         lvl: 
 *                           type: integer
 *                           description: level pemain
 *                           example: 600
 *                         createdAt: 
 *                           type: timestamp
 *                           description: timestamp data dibuat
 *                           example: 2023-06-28T03:10:18.263Z
 *                         updatedAt: 
 *                           type: timestamp
 *                           description: timestamp data diperbarui
 *                           example: 2023-06-28T03:10:18.263Z    
 */

// UPDATE PLAYER
/**
 * @swagger
 * /api/v1/players/{id}:
 *    put:
 *      summary: API ini digunakan untuk mengubah data player
 *      description: API ini digunakan untuk mengubah data player berdasarkan id dalam format JSON
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: id pemain
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                     username:
 *                       type: string
 *                       description: nama pemain
 *                       example: GoroseiMercury666             
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: indikator sukses
 *                     example: Success
 *                   message:
 *                     type: string
 *                     description: pesan data player berdasarkan id berhasil di update    
 *                     example: 'Player with id: 5 successfully updated'               
 */

// DELETE PLAYER
/**
 * @swagger
 * /api/v1/players/{id}:
 *    delete:
 *      summary: API ini digunakan untuk menghapus data player
 *      description: API ini digunakan untuk menghapus data player berdasarkan id dalam format JSON
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: id pemain           
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: indikator sukses
 *                     example: Success
 *                   message:
 *                     type: string
 *                     description: pesan data player berdasarkan id berhasil di update    
 *                     example: 'Player with id: 5, was deleted successfully'               
 */

// UPDATE PLAYER EXPERIENCE
/**
 * @swagger
 * /api/v1/players/exp/{id}:
 *    post:
 *      summary: API ini digunakan untuk menambah poin pengalaman player
 *      description: API ini digunakan untuk menambah poin pengalaman player berdasarkan id dalam format JSON
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: id pemain
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                     exp:
 *                       type: integer
 *                       description: poin pengalaman pemain
 *                       example: 1000             
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     description: indikator sukses
 *                     example: Success
 *                   message:
 *                     type: string
 *                     description: pesan data player berdasarkan id berhasil di update    
 *                     example: 'Player with id = 5 gain 1000 experience. Total experience = 5000'               
 */