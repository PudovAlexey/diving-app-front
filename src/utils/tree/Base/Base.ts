class BaseTree {
  subscribers: {
    key: string;
    cb: (value: any) => void;
  }[] = [];

  subscribe<P extends keyof this, V extends this[P]>(
    key: P,
    cb: (value: V) => void
  ) {
    const data = key as string;
    this.subscribers.push({ key: data, cb });
  }

  unSubscribe<P extends keyof this>(key: P) {
    this.subscribers = this.subscribers.filter((val) => val.key !== key);
  }

  set<P extends keyof this, V extends this[P]>(property: P, value: V): V {
    const isSubscribeValue = this.subscribers.find(
      ({ key }) => key === property
    );

    if (isSubscribeValue) {
      isSubscribeValue.cb(value);
    }

    this[property] = value;

    return value;
  }

  get<P extends keyof this>(property: P): this[P] {
    const value = this[property];
    return value;
  }
}

export { BaseTree };
