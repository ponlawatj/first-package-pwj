'use babel';

import FirstPackagePwjView from './first-package-pwj-view';
import { CompositeDisposable } from 'atom';

export default {

  firstPackagePwjView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.firstPackagePwjView = new FirstPackagePwjView(state.firstPackagePwjViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.firstPackagePwjView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'first-package-pwj:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.firstPackagePwjView.destroy();
  },

  serialize() {
    return {
      firstPackagePwjViewState: this.firstPackagePwjView.serialize()
    };
  },

  toggle() {
    console.log('FirstPackagePwj was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
