  <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Post Title
          </label>
          <input
            {...register("title", { required: true })}
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Post Title"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="postText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            placeholder="Post text"
          >
            Post Text
          </label>
          <textarea
            {...register("text", { required: true })}
            type="text"
            rows={10}
            id="postText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Leave a post..."
          />
        </div>
        <div className="flex items-center mb-5">
          <label
            htmlFor="isFeatured"
            className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
          >
            Is Featured?
          </label>
          <div className="flex items-center h-5">
            <input
              {...register("isFeatured")}
              id="isFeatured"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
        </div>

        {!watch("image") || watch("image").length === 0 ? (
          <div className={classes.control}>
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              Upload Image
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              id="image"
              accept="image/*"
            />
          </div>
        ) : (
          <strong>{watch("image")[0].name}</strong>
        )}
        {errors.exampleRequired && <span>This field is required</span>}

        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>