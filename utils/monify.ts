import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const MONIFY_BASE_URL = process.env.MONIFY_BASE_URL;
const MONIFY_API_KEY = process.env.MONIFY_API_KEY;
const MONIFY_SECRET_KEY = process.env.MONIFY_API_SECRET;
const MONIFY_CONTRACT_CODE = process.env.MONIFY_CONTRACT_CODE;

async function getMonnifyAccessToken() {
    try {
        // Use native Buffer for base64 encoding
        const auth = Buffer.from(`${MONIFY_API_KEY}:${MONIFY_SECRET_KEY}`).toString('base64');
        
        console.log('Attempting Monnify authentication...');
        
        const response = await axios.post(
            `${MONIFY_BASE_URL}/api/v1/auth/login`,
            {},
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Monnify auth response:', response.data);

        if (!response.data.requestSuccessful) {
            throw new Error(response.data.responseMessage || 'Authentication failed');
        }

        return response.data.responseBody.accessToken;
    } catch (error: any) {
        console.error('Monnify auth error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw new Error('Monnify authentication failed');
    }
}

export async function createReservedAccount(userId: string, customerName: string, customerEmail: string) {
    try {
        console.log('Getting Monnify access token...');
        const accessToken = await getMonnifyAccessToken();

        console.log('Creating reserved account...');
        const response = await axios.post(
            `${MONIFY_BASE_URL}/api/v2/bank-transfer/reserved-accounts`,
            {
                accountReference: userId,
                accountName: customerName,
                currencyCode: "NGN",
                contractCode: MONIFY_CONTRACT_CODE,
                customerEmail: customerEmail,
                customerName: customerName,
                getAllAvailableBanks: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data.requestSuccessful) {
            throw new Error(response.data.responseMessage || 'Failed to create account');
        }

        return response.data.responseBody;
    } catch (error: any) {
        console.error('Reserved account creation error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw new Error(error.response?.data?.responseMessage || 'Failed to create reserved account');
    }
}