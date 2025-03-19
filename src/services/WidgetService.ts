import {WidgetEntity} from '../entities';
import Subscriber from "./Subscriber.ts";

class WidgetService extends Subscriber {
    private _widgets = JSON.parse(localStorage.getItem('widgets') ?? '[]');

    get widgets(): WidgetEntity[] {
        return this._widgets;
    }
    set widgets(widgets: WidgetEntity[]) {
        this._widgets = widgets;
        localStorage.setItem('widgets', JSON.stringify(widgets));
        this.notifySubscribers();
    }

    public toggleFavourite = (index: number | undefined): void => {
        if (index !== undefined && this.widgets[index]) this.widgets[index] = { ...this.widgets[index], favourite: !this.widgets[index].favourite }
        this.widgets = [...this.widgets];
    }

    public removeWidget = (index: number | undefined): void => {
        if (index !== undefined) this.widgets.splice(index, 1);
        this.widgets = [...this.widgets];
    }

    public updateWidget = (updatedWidget: WidgetEntity): void => {
        const index = this.widgets.findIndex(widget => widget.currentWeather.id === updatedWidget.currentWeather.id);
        if (index !== -1) this.widgets.splice(index, 1, updatedWidget);
        this.widgets = [...this.widgets];
    }

    public addNewWidget = (newWidget: WidgetEntity): void => {
        this.widgets = [...this.widgets, { ...newWidget, favourite: false }]
    }

    public hasDuplicates = (cityName: string): boolean => {
        return this.widgets.some((widget: WidgetEntity) => widget.currentWeather.name === cityName);
    }
}

export default new WidgetService();