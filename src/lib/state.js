import { computed, observable } from 'mobx'
import automation from './automation'

const _defaults = {
  messageTitle: null,
  messageDescription: null,
  messageType: '',

  width: 1000,
  height: 660,
}

export default class State {
  defaults = _defaults

  @observable isRunning = false

  @observable messageTitle = _defaults.messageTitle
  @observable messageDescription = _defaults.messageDescription
  @observable messageType = _defaults.messageType

  @observable url = ''
  @observable highlightUrl = false
  @observable isLoading = false

  @observable width = _defaults.width
  @observable height = _defaults.height

  @observable reporterWidth = 0
  @observable headerHeight = 0

  @observable _windowWidth = 0
  @observable _windowHeight = 0

  @observable automation = automation.CONNECTING

  @computed get scale () {
    if (this._containerWidth < this.width || this._containerHeight < this.height) {
      return Math.min(this._containerWidth / this.width, this._containerHeight / this.height, 1)
    }
    return 1
  }

  @computed get _containerWidth () {
    return this._windowWidth - this.reporterWidth
  }

  @computed get _containerHeight () {
    return this._windowHeight - this.headerHeight
  }

  @computed get marginLeft () {
    return (this._containerWidth / 2) - (this.width / 2)
  }

  @computed get displayScale () {
    return Math.floor(this.scale * 100)
  }

  @computed({ asStructure: true }) get messageStyles () {
    const actualHeight = this.height * this.scale
    const messageHeight = 33
    const nudge = 10

    if ((actualHeight + messageHeight + nudge) >= this._containerHeight) {
      return { bottom: 0, opacity: '0.7' }
    } else {
      return { top: (actualHeight + this.headerHeight + nudge), opacity: '0.9' }
    }
  }

  updateDimensions (width, height) {
    this.width = width
    this.height = height
  }

  updateWindowDimensions ({ windowWidth, windowHeight, reporterWidth, headerHeight }) {
    this._windowWidth = windowWidth
    this._windowHeight = windowHeight
    this.reporterWidth = reporterWidth
    this.headerHeight = headerHeight
  }

  clearMessage () {
    this.messageTitle = _defaults.messageTitle
    this.messageDescription = _defaults.messageDescription
    this.messageType = _defaults.messageType
  }
}