/*eslint-disable */
const json = [
  {"reference":"163585","badproperty":"NL90ABNA0585647886","description":"Candy for Vincent Bakker","startBalance":"32.01","mutation":"+27.12","endBalance":"59.13"},
  {"reference":"175885","accountNumber":"NL43AEGO0773393871","description":"Clothes for Richard de Vries","startBalance":"5429","mutation":"-939","endBalance":"6368"},
  {"reference":"126297","accountNumber":"NL93ABNA0585619023","description":"Candy for Vincent Dekker","startBalance":"105.24","mutation":"-25.89","endBalance":"79.35"},
  {"reference":"159130","accountNumber":"NL91RABO0315273637","description":"Subscription for Daniël Bakker","startBalance":"38.62","mutation":"+4.53","endBalance":"43.15"},
  {"reference":"121333","accountNumber":"NL43AEGO0773393871","description":"Subscription for Richard Theuß","startBalance":"46.62","mutation":"+20.52","endBalance":"67.14"},
  {"reference":"198497","accountNumber":"NL91RABO0315273637","description":"Tickets from Richard Dekker","startBalance":"91.96","mutation":"+39.96","endBalance":"131.92"},
  {"reference":"181742","accountNumber":"NL91RABO0315273637","description":"Candy from Daniël de Vries","startBalance":"10.1","mutation":"-0.3","endBalance":"9.8"},
  {"reference":"130728","accountNumber":"NL32RABO0195610843","description":"Clothes from Richard de Vries","startBalance":"85.22","mutation":"+45.86","endBalance":"131.08"},
  {"reference":"146009","accountNumber":"NL90ABNA0585647886","description":"Flowers for Jan Theuß","startBalance":"99.25","mutation":"+8.06","endBalance":"107.31"},
  {"reference":"146009","accountNumber":"NL90ABNA0585647886","description":"Flowers for Jan Theuß","startBalance":"99.25","mutation":"+8.06","endBalance":"107.31"},
  {"reference":"190406","accountNumber":"NL91RABO0315273637","description":"Subscription for Daniël Theuß","startBalance":"3980","mutation":"+1000","endBalance":"4981"}
];

const csv = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
137243,NL93ABNA0585619023,Candy from Rik King,13.33,+38.58,51.91
112806,NL90ABNA0585647886,Candy for Vincent King,16.91,-38.13,-21.22
118455,NL46ABNA0625805417,Clothes for Rik de Vries,18.08,+26.08,44.16
168541,NL43AEGO0773393871,Flowers from Jan Theuß,81.2,-49.38,31.82
112806,NL32RABO0195610843,Clothes for Peter King,14.84,+34.32,49.16
112806,NL93ABNA0585619023,Flowers for Willem Bakker,89.66,-35.54,54.12
159854,NL56RABO0149876948,Tickets from Peter Dekker,56.42,-31.99,24.43
153928,NL91RABO0315273637,Clothes for Jan Theuß,79.52,+41.24,120.76
133575,NL93ABNA0585619023,Candy for Jan Theuß,109.04,+40.16,148.2
186393,NL74ABNA0248990274,Flowers for Willem Bakker,30.4,+43.18,73.58`;

const xml = `<records>
  <record reference="163585">
    <xaccountNumber>NL90ABNA0585647886</xaccountNumber>
    <description>Candy for Vincent Bakker</description>
    <startBalance>32.01</startBalance>
    <mutation>+27.12</mutation>
    <endBalance>59.13</endBalance>
  </record>
  <record reference="175885">
    <accountNumber>NL43AEGO0773393871</accountNumber>
    <description>Clothes for Richard de Vries</description>
    <startBalance>5429</startBalance>
    <mutation>-939</mutation>
    <endBalance>6368</endBalance>
  </record>
  <record reference="126297">
    <accountNumber>NL93ABNA0585619023</accountNumber>
    <description>Candy for Vincent Dekker</description>
    <startBalance>105.24</startBalance>
    <mutation>-25.89</mutation>
    <endBalance>79.35</endBalance>
  </record>
  <record reference="159130">
    <accountNumber>NL91RABO0315273637</accountNumber>
    <description>Subscription for Daniël Bakker</description>
    <startBalance>38.62</startBalance>
    <mutation>+4.53</mutation>
    <endBalance>43.15</endBalance>
  </record>
  <record reference="121333">
    <accountNumber>NL43AEGO0773393871</accountNumber>
    <description>Subscription for Richard Theuß</description>
    <startBalance>46.62</startBalance>
    <mutation>+20.52</mutation>
    <endBalance>67.14</endBalance>
  </record>
  <record reference="198497">
    <accountNumber>NL91RABO0315273637</accountNumber>
    <description>Tickets from Richard Dekker</description>
    <startBalance>91.96</startBalance>
    <mutation>+39.96</mutation>
    <endBalance>131.92</endBalance>
  </record>
  <record reference="181742">
    <accountNumber>NL91RABO0315273637</accountNumber>
    <description>Candy from Daniël de Vries</description>
    <startBalance>10.1</startBalance>
    <mutation>-0.3</mutation>
    <endBalance>9.8</endBalance>
  </record>
  <record reference="130728">
    <accountNumber>NL32RABO0195610843</accountNumber>
    <description>Clothes from Richard de Vries</description>
    <startBalance>85.22</startBalance>
    <mutation>+45.86</mutation>
    <endBalance>131.08</endBalance>
  </record>
  <record reference="146009">
    <accountNumber>NL90ABNA0585647886</accountNumber>
    <description>Flowers for Jan Theuß</description>
    <startBalance>99.25</startBalance>
    <mutation>+8.06</mutation>
    <endBalance>107.31</endBalance>
  </record>
  <record reference="146009">
    <accountNumber>NL90ABNA0585647886</accountNumber>
    <description>Flowers for Jan Theuß</description>
    <startBalance>99.25</startBalance>
    <mutation>+8.06</mutation>
    <endBalance>107.31</endBalance>
  </record>
  <record reference="190406">
    <accountNumber>NL91RABO0315273637</accountNumber>
    <description>Subscription for Daniël Theuß</description>
    <startBalance>3980</startBalance>
    <mutation>+1000</mutation>
    <endBalance>4981</endBalance>
  </record>
</records>`;

export { xml, csv, json };
