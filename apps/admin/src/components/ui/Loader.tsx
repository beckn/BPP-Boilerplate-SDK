import { LoadingOutlined } from '@ant-design/icons'

function Loader({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col justify-center items-center text-white ${className} `}>
      <LoadingOutlined className="text-4xl text-white" />
    </div>
  )
}

export default Loader
