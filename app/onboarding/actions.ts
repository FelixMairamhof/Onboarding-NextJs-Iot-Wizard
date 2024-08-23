"use server";

export async function submitSensorSelection(customer: string, manufactor: string, type: string) {
    console.log('Form submitted with:', { customer, manufactor, type });
}

export async function getCustomer() {
    return ["Helmut", "Sepp", "Hansi"];
}

export async function getManufactor() {
    return ["Intel", "AMD", "Dragon"];
}

export async function getType(manufactor: string) {
    return ["x1123", "x12", "x98"];
}

// Updated function to get image URL based on form selections
export async function getImageUrl(customer: string, manufactor: string, type: string): Promise<string> {
    // Here, you should implement the logic to fetch the image URL based on the selections
    // For demonstration, returning a placeholder URL
    return "/vercel.svg"; // Replace this with actual logic
}
