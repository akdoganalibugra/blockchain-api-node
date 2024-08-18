/**
 * @swagger
 * /rewards/reward-users:
 *   post:
 *     summary: Reward users with tokens
 *     description: >
 *       Bu metod, kullanıcılara token ödüllendirir. Bu test durumu için statik bir cüzdan kullanılmıştır,
 *       bu nedenle metod herhangi bir parametre almamaktadır. Ancak, ölçeklenebilir olup kolaylıkla parametre alacak şekilde değiştirilebilir.
 *     tags: [Rewards]
 *     responses:
 *       200:
 *         description: Tokens rewarded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 result:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "0x123..."
 *                     balance:
 *                       type: string
 *                       example: "1000"
 *                     transactionHash:
 *                       type: string
 *                       example: "0xbd3..."
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rewards/winners:
 *   get:
 *     summary: Get the list of winners
 *     tags: [Rewards]
 *     responses:
 *       200:
 *         description: A list of winners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 result:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["0x123...", "0x456..."]
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *       500:
 *         description: Internal server error
 */
