
export default {

    bus: null,
    init(bus) {
        let self = this;
        this.initBus(bus);

    },
    initBus(bus) { this.bus = bus; },
    send(event, msg) {
        this.bus.send(event, msg)
    },
    on(event, cb) {
        this.bus.on(event, cb)
    },
    config: {}

}