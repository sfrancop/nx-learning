export default interface WeatherDesiredData {
    weather: Array<{
        description: string;
        icon: string;
    }>;
    main: {
        temp: number;
    };
}