//date

const getDateFromISO = (dateString) => {
    // Check if it's a string
    if (typeof dateString !== "string") {
      throw new Error("Input must be a string");
    }
  
    // Check if it matches ISO format (basic check)
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/.test(dateString)) {
      throw new Error("Invalid ISO date format. Expected: 'YYYY-MM-DDTHH:mm:ss.sssZ'");
    }
  
    // Extract date part
    const datePart = dateString.split("T")[0];
    return datePart;
  };

module.exports= getDateFromISO;