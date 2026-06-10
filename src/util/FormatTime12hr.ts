 export const formatTime12hr = (timeStr:any) => {
    if (!timeStr || typeof timeStr !== 'string') return '';
    const [hours, minutes] = timeStr.split(':');
    if (!hours || !minutes) return '';

    let hour = parseInt(hours, 10);
    const minute = minutes.padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // 12:00 AM/PM

    return `${hour}:${minute} ${ampm}`;
};