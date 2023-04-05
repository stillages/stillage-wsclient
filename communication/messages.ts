export enum EMessageAction {
    init = 'init',
    state = 'state',
    newcard = 'newcard',
    protectedwayalert = 'protectedwayalert',
    showpin = 'showpin',
    hidepin = 'hidepin',
}

export interface IBaseMessagePayload {
}

export interface IBaseMessage {
    action: EMessageAction;
    payload: IBaseMessagePayload;
}

export interface IStateMessagePayload {
    name: string;   // Имя блока (выводится на управляющем сенсорном мониторе)
    mode: string;   // Текстовое значение состояния секции стеллажей
    ways: number[];             // Список открытых проходов
    errorCode: string;          // Текствое поле кода ошибки
    temperature: string;        // Текстовое поле температуры с датчика
    humidity: string;           // Текстовое поле влажности с датчика
    defaultWayTimer: string;    // Текстовое поле таймера открытия прохода по-умолчанию
}

export interface IInitMessagePayload extends IStateMessagePayload {
    racksCount: number;         // Количество стеллажей в составе секции
    fixed: number[]             // Список номера стационарных стелажей (при наличии)
    // Настройки на сенсорном экране
    settings:
    {
        display_timer: number;          // Таймер автоматического выключения дисплея на сенсорном экране
        light_timer: number;            // Таймер автоматического выключения освещения
        default_ways_timeout: number;   // Таймер автоматического выключения дисплея на сенсорном экране
        auto_ventilation_at: string;    // Время перехода в режим вентиляции
        auto_ventilation_on: boolean;   // Признак включения режима автоматической вентиляции в заданное время
    }
}

/**
 * Расширенное состояние оборудования (при инициализации клиента)
 */
export class InitMessage implements IBaseMessage {
    action: EMessageAction.init;
    payload: IInitMessagePayload;
}

/**
 * Состояние оборудования
 */
export class StateMessage implements IBaseMessage {
    action: EMessageAction.state;
    payload: IStateMessagePayload;
}

/**
 * Сообщение о считывании новой IC карты
 */
export class NewCardMessage implements IBaseMessage {
    action: EMessageAction.newcard;
    payload: {
        id: string; // Идентификатор карты
    }
}

/**
 * Сообщение о несанкционированном открытии защищенного прохода
 */
export class ProtectedWayAlert implements IBaseMessage {
    action: EMessageAction.protectedwayalert;
    payload: {
        way: number;
    }
}
