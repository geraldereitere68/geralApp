export type BoxComponent = <C extends React.ElementType = 'span'>(
  props: {
    glamor: PolymorphicComponentPropWithRef<C, {
      backlog: PolymorphicRef<C>;
    }};
  ) => React.ReactElement | null;
