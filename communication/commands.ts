/**
 * Команды управления блоком стеллажей
 */
export enum ECommandAction {
    openway = 'openway',
    stop = 'stop',
    ventilation = 'ventilation',
    setconfig = 'setconfig',
    getconfig = 'getconfig',
}

/**
 * Тип стеллажа
 */
export enum ERackKind {
    fixed = 'fixed',
    mobile = 'mobile',
}

/**
 * Конфигурация блока стеллажей
 */
export interface ISectionConfig {
    racks: IRackConfig[];
    name: string,               // Имя блока (выводится на управляющем сенсорном мониторе)
    pin_code: string;           // пин код
    known_cards: string[],      // IC карты с доступом для открытия стеллажей
    protected_ways: number[],   // Защищенные проходы, требуюшие ввода пин-кода или IC карту
    display_timer: number;      // Таймер автоматического выключения дисплея на сенсорном экране
    light_timer: number;        // Таймер автоматического выключения освещения
    default_ways: number[],     // Проходы по-умолчанию
    default_ways_timeout: number;   // Таймер открытия проходов по-умолчанию
    auto_ventilation_at: string;    // Время перехода в режим вентиляции
    auto_ventilation_on: boolean;   // Признак включения режима автоматической вентиляции в заданное время
}

/**
 * Конфигурация стеллажа
 */
export interface IRackConfig {
    address: number;            // Адрес стеллажа
    kind: ERackKind;            // Тип стеллажа
    enable_green_in_2: true,    // Обработка сигналов ИД конца прохода (по-умолчанию включен. Отличное значение применятся отладочных целей)
    enable_sensor_ir: true,     // Обработка сигналов ИК начала прохода (по-умолчанию включен. Отличное значение применятся отладочных целей)
    enable_sensor_ir_2: true,   // Обработка сигналов ИК конца прохода (по-умолчанию включен. Отличное значение применятся отладочных целей)
    enable_plinth: true,        // Обработка сигналов плинтуса (по-умолчанию включен. Отличное значение применятся отладочных целей)
}

export interface IBasePayload {
}

export interface IBaseCommand {
    action: ECommandAction;
    payload?: IBasePayload;
}

/**
 * Команда открытия рабочего прохода
 */
export interface IOpenWayCommand extends IBaseCommand {
    action: ECommandAction.openway;
    payload: {
        way: number;    // Номер открываемого прохода
    }
}

/**
 * Команда остановки стеллажей
 */
export interface IStopCommand extends IBaseCommand {
    action: ECommandAction.stop;
}

/**
 * Команда перехода в режим вентиляции
 */
export interface IVentilationCommand extends IBaseCommand {
    action: ECommandAction.ventilation;
}

/**
 * Команда изменения конфигурации оборудования
 */
export interface ISetupCommand extends IBaseCommand {
    action: ECommandAction.setconfig;
    payload: ISectionConfig;
}
