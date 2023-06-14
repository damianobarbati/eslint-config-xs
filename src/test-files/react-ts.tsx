import React, { useState, FC } from 'react';

type Props = {
  content: string;
}

const Foo: FC = ({ content }: Props) => <span>{content}</span>;
